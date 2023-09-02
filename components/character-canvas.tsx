"use client";

import { CharacterSelectionContext } from "@/lib/character-selection-context";
import { BodyPartImage, CharacterState } from "@/lib/character-selection-reducer";
import { PartType } from "@prisma/client";
import { useContext, useLayoutEffect, useRef } from "react"

const ImageCentering = 32;
const ImageScaling = 4;

type ProcessedImage = {
  img: CanvasImageSource;
  adjustments?: {
    x: number;
    y: number;
  }
}

/**
 * A function that accepts an {@link HTMLImageElement}, performs some actions to transform it, then
 * returns the a new, modified image.
 */
type PostProcessing = (img: ProcessedImage) => Promise<ProcessedImage | undefined>;

/**
 * A type used to define a singular drawing command. This contains information on which image to
 * process, and which processing steps to take.
 */
type DrawCommand = {
  /**
   * The image, and its associated data, to process.
   */
  image: BodyPartImage | null;

  /**
   * The processing steps to take. Note that these are performed explicitly in-sequence.
   */
  postProcessing: PostProcessing[];
};

/**
 * A {@link PostProcessing} command used to create a pixel-style outline around the provided image.
 * @param img The image to draw an outline around.
 * @returns The image with the rendered outline.
 */
const DrawOutline: PostProcessing = async (img) => {
  // https://stackoverflow.com/a/28416298/17503966
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  let dArr = [
    // -1, -1,
    //  1, -1,
    // -1,  1,
    //  1,  1,

     0, -1,
    -1,  0,
     1,  0,
     0,  1,
  ],
    s = 1,
    i = 0,
    x = 1,
    y = 1;

  for (; i < dArr.length; i+= 2) {
    ctx.drawImage(img.img, x + dArr[i]*s, y + dArr[i+1]*s);
  }

  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(img.img, x, y);

  const dataURL = canvas.toDataURL();
  const newImg = await LoadImage(dataURL);

  return {
    img: newImg,
    adjustments: {
      x: (img.adjustments?.x ?? 0) - s,
      y: (img.adjustments?.y ?? 0) - s,
    }
  };
}

function CalculateDrawingCoords(
  layer: { x: number, y: number, processed: { adjustments?: { x: number, y: number } } },
  layout?: { anchorX: number, anchorY: number },
): {
  x: number,
  y: number,
} {
  let x = ImageCentering, y = ImageCentering;
    
  // Layouts are relative positions from the body to the "focal point" of the part. For example,
  // we could have -2/+3 for our X/Y, which would mean that the focal point of the given part is
  // 2 pixels left, and 3 pixels down from the focal point of the body.
  if (layout) {
    x += layout.anchorX;
    y += layout.anchorY;
  }

  // The layer's anchor refers to the anchor of the image. These are the coordinates in the image
  // file that refer to the focal point on the image. For example, if our target point is the top-
  // left portion of a leg, this might be +1/+0, to imply that the point is 1 to the right, and
  // 0 pixels down from the top-left corner of the image.
  x -= layer.x;
  y -= layer.y;

  // Sometimes a process step might change the size of the image (e.g. adding an outline). In this
  // case we need to shift our focal point over by a set amount. Most translations probably won't
  // need this.
  if (layer.processed.adjustments) {
    x += layer.processed.adjustments.x;
    y += layer.processed.adjustments.y;
  }

  return {x, y}
}

async function PImg(canvas: HTMLCanvasElement, cmds: DrawCommand[], character: CharacterState) {
  // do all the layering to get a silhouette
  // make the outline and savor that flavor
  // do the post-processing on each part
  // redo the layering

  const ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  const layouts = new Map(character.Layouts.map((l) => [l.partType, l]));

  type ImageLayer = {
    x: number;
    y: number;
    processed: ProcessedImage;
    partType?: PartType;
    image?: HTMLImageElement;
  }

  const imgPromises = cmds.map(async (c) => {
    if (!c.image) { return undefined; }
    
    const imgb64 = c.image.encImage;
    const imgUrl = `data:image/png;base64,${imgb64}`;
    const image = await LoadImage(imgUrl);

    let processed: ProcessedImage = { img: image };
    for (let process of c.postProcessing) {
      processed = await process(processed) ?? processed;
    }

    const coords = CalculateDrawingCoords(
      {
        x: c.image.anchorX,
        y: c.image.anchorY,
        processed,
      },
      layouts.get(c.image.partType),
    )

    return {
      x: coords.x,
      y: coords.y,
      partType: c.image.partType,
      processed,
      image,
    } as ImageLayer;
  });

  const layers = (await (Promise.all(imgPromises))).filter(Boolean) as ImageLayer[];

  // const outlineCanvas = document.createElement('canvas');
  // outlineCanvas.height = 64;
  // outlineCanvas.width = 64;
  
  // const outlineCtx = outlineCanvas.getContext('2d');
  // if (!outlineCtx) { return; }
  // for (let l of layers) {
  //   if (!l.image) { continue; }
  //   outlineCtx.drawImage(l.image, 0, 0);
  // }

  // const outlineImage = await DrawOutline({ img: outlineCanvas })
  // const outlineLayer: ImageLayer | undefined = outlineImage && {
  //   anchorX: 0,
  //   anchorY: 0,
  //   processed: outlineImage,
  //   partType: PartType.Body,
  // };

  // const processedLayers: ImageLayer[] = [
  //   ...layers
  // ]

  // if (outlineLayer) { processedLayers.unshift(outlineLayer); }

  const processedCanvas = document.createElement('canvas');
  processedCanvas.height = 64;
  processedCanvas.width = 64;

  const outlineCanvas = document.createElement('canvas');
  outlineCanvas.height = 64;
  outlineCanvas.width = 64;

  const processedCtx = processedCanvas.getContext('2d');
  if (!processedCtx) { return; }

  const outlineCtx = outlineCanvas.getContext('2d');
  if (!outlineCtx) { return; }

  for (let layer of layers) {
    processedCtx.drawImage(layer.processed.img, layer.x, layer.y);
    if (layer.image) {
      outlineCtx.drawImage(layer.image, layer.x, layer.y);
    }
  }

  const outlineImage = await DrawOutline({img: outlineCanvas});

  // for (let layer of processedLayers) {
  //   let x = ImageCentering, y = ImageCentering;
    
  //   // Layouts are relative positions from the body to the "focal point" of the part. For example,
  //   // we could have -2/+3 for our X/Y, which would mean that the focal point of the given part is
  //   // 2 pixels left, and 3 pixels down from the focal point of the body.
  //   const layout = layer.partType && layouts.get(layer.partType);
  //   if (layout) {
  //     x += layout.anchorX;
  //     y += layout.anchorY;
  //   }

  //   // The layer's anchor refers to the anchor of the image. These are the coordinates in the image
  //   // file that refer to the focal point on the image. For example, if our target point is the top-
  //   // left portion of a leg, this might be +1/+0, to imply that the point is 1 to the right, and
  //   // 0 pixels down from the top-left corner of the image.
  //   x -= layer.x;
  //   y -= layer.y;

  //   // Sometimes a process step might change the size of the image (e.g. adding an outline). In this
  //   // case we need to shift our focal point over by a set amount. Most translations probably won't
  //   // need this.
  //   if (layer.processed.adjustments) {
  //     x += layer.processed.adjustments.x;
  //     y += layer.processed.adjustments.y;
  //   }

  //   draftCtx.drawImage(layer.processed.img, x, y);
  // }

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(ImageScaling, ImageScaling);
  if (outlineImage) {
    ctx.drawImage(
      outlineImage.img,
      (ImageCentering / 8) + (outlineImage.adjustments?.x ?? 0),
      -(ImageCentering / 3) + (outlineImage.adjustments?.y ?? 0)
    )
  }
  ctx.drawImage(processedCanvas, (ImageCentering / 8), -(ImageCentering / 3));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * A helper method used to process the components of a character image into a singular image on the
 * provided {@link canvas}.
 * @param canvas The canvas that the image should be drawn upon.
 * @param cmds A list of processing commands that contain information about what to draw.
 * @param character The character state as taken from the {@link CharacterSelectionContext}.
 */
async function ProcessImages(canvas: HTMLCanvasElement, cmds: DrawCommand[], character: CharacterState) {
  const ctx = canvas.getContext("2d");
  if (!ctx) { return; }

  const imgPromises = cmds.map(async (cmd) => {
    if (!cmd.image) { return; }

    const imgb64 = cmd.image.encImage;
    const imgUrl = `data:image/png;base64,${imgb64}`;
    let img = await LoadImage(imgUrl);
    
    let processed: ProcessedImage = { img }
    for (let process of cmd.postProcessing) {
      processed = await process(processed) ?? processed;
    }

    return {
      anchorX: cmd.image.anchorX,
      anchorY: cmd.image.anchorY,
      partType: cmd.image.partType,
      image: processed,
    };
  });

  const images = (await (Promise.all(imgPromises))).filter(Boolean);
  const layouts = new Map(character.Layouts.map((l) => [l.partType, l]));

  const draftCanvas = document.createElement('canvas');
  draftCanvas.height = 64;
  draftCanvas.width = 64;

  const draftCtx = draftCanvas.getContext('2d');
  if (!draftCtx) { return; }

  for (let img of images) {
    const layout = layouts.get(img!.partType)

    const x = (layout?.anchorX ?? 0) - (img?.anchorX ?? 0) + (img!.image.adjustments?.x ?? 0);
    const y = (layout?.anchorY ?? 0) - (img?.anchorY ?? 0) + (img!.image.adjustments?.y ?? 0);
    
    draftCtx.drawImage(img!.image.img, 32 + x , 32 + y);
  }

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(4, 4);
  ctx.drawImage(draftCanvas, (32 / 8), -(32 / 3));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * A helper method used to load an image from a source to an {@link HTMLImageElement}. This method
 * guarantees that the image is loaded (or that the load failed) before returning.
 * @param src The source for the image. This can be a data URL, or a direct link.
 * @returns The image rendered as an {@link HTMLImageElement}.
 */
function LoadImage(src: string): Promise<HTMLImageElement> {
  // https://stackoverflow.com/a/66180709/17503966
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * A canvas used to render a character's image.
 */
export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character = useContext(CharacterSelectionContext);

  useLayoutEffect(() => {
    if (!canvasRef.current || !character) {
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const { Parts } = character;
    const drawCmds: DrawCommand[] = [
      { image: Parts.RightLeg, postProcessing: [] },
      { image: Parts.RightArm, postProcessing: [] },
      { image: Parts.Body, postProcessing: [] },
      { image: Parts.Head, postProcessing: [] },
      { image: Parts.FacialHair, postProcessing: [] },
      { image: Parts.Hair, postProcessing: [] },
      { image: Parts.HairAccessory, postProcessing: [] },
      { image: Parts.Eyes, postProcessing: [] },
      { image: Parts.FaceAccessory, postProcessing: [] },
      { image: Parts.LeftArm, postProcessing: [DrawOutline] },
      { image: Parts.LeftLeg, postProcessing: [DrawOutline] },
    ];

    // for (let cmd of drawCmds) {
    //   if (!cmd.image) { continue; }
      
    //   const imgb64 = cmd.image.encImage;
    //   const imgUrl = `data:image/png;base64,${imgb64}`;

    //   LoadImage(imgUrl)
    // }

    // ProcessImages(canvasRef.current, drawCmds, character);
    PImg(canvasRef.current, drawCmds, character);
  }, [canvasRef, character]);

  return (
    <canvas className="h-full" ref={canvasRef}/>
  )
}

import {
  OutfitType,
  PartType,
} from "@prisma/client";
import {
  BodyPartOrderConfig,
  OutfitLayerConfig,
  OutfitLayerType,
  OutfitLayerTypeOrderConfig,
} from "./outfit-configuration";
import { ColorGroup, ColorGroupCount, DefaultColorForPallete, HexStringToRGB, RGBToHexString } from "./colors";
import { CharacterBody, BodyPart_Client, ColorFilter, BodyLayout_Client } from "./store/character-body";

export const ImageCentering = 32;
export const ImageScaling = 4;

export type ImageLayer = {
  x: number;
  y: number;
  processed: ProcessedImage;
  partType?: PartType;
  image?: HTMLImageElement;
}

export function SortDrawingLayers(
  input: CharacterBody['Parts'],
  processing: { [Property in PartType]?: PostProcessing[]; }
): DrawCommand[] {
  const groupedLayers: {
    [Property in PartType]?: {
      [Property in OutfitLayerType]?: DrawCommand;
    }
  } = {};

  if (!input) { return []; }

  Object.entries(input).forEach(([outfitType, outfit]) => {
    Object.entries(outfit).forEach(([partType, part]) => {
      const outfitLayerType = OutfitLayerConfig[outfitType as OutfitType];
      const partLayer = groupedLayers[partType as PartType] ?? {};
      const postProcessing = (processing[partType as PartType]) ?? [];

      partLayer[outfitLayerType] = {
        part,
        postProcessing,
      };
      
      groupedLayers[partType as PartType] = partLayer;
    });
  });

  const orderedLayers = Object.values(groupedLayers)
    .flatMap((l) => Object.entries(l).sort((a, b) => {
      if (!a) { return -1; }
      if (!b) { return 1; }

      const aVal = OutfitLayerTypeOrderConfig[a[0] as keyof typeof OutfitLayerType];
      const bVal = OutfitLayerTypeOrderConfig[b[0] as keyof typeof OutfitLayerType];

      return aVal - bVal;
    }))
    .map(([_, v]) => v)
    .sort((a, b) => {
      if (!a || !a.part || !a.part.partType) { return -1; }
      if (!b || !b.part || !b.part.partType) { return 1; }

      const aVal = BodyPartOrderConfig[a.part.partType];
      const bVal = BodyPartOrderConfig[b.part.partType];

      return aVal - bVal;
    });

  return orderedLayers;
}

/**
 * A container for an image that has been processed. Includes the source element in addition to any
 * adjustments that might need to be included when rendering the final image.
 */
export type ProcessedImage = {
  /**
   * The image that will be processed, or has been processed.
   */
  img: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas;

  /**
   * A set of adjustments made to the image that need to be noted when rendering the final image.
   */
  adjustments: {
    /**
     * x-axis movement adjustments.
     */
    x: number;

    /**
     * y-axis movement adjustments.
     */
    y: number;
  }
}

/**
 * A function that accepts an {@link HTMLImageElement}, performs some actions to transform it, then
 * returns the a new, modified image.
 */
export type PostProcessing = (img: ProcessedImage) => Promise<ProcessedImage | undefined>;

/**
 * A type used to define a singular drawing command. This contains information on which image to
 * process, and which processing steps to take.
 */
export type DrawCommand = {
  /**
   * The image, and its associated data, to process.
   */
  part: BodyPart_Client | null;

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
export const DrawOutlineProcessing: PostProcessing = async (img) => {
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
     x: (img.adjustments.x) - s,
     y: (img.adjustments.y) - s,
   }
 };
}

export function ConstructColorReplacementProcessing(filter: ColorFilter): PostProcessing {
  return async (img: ProcessedImage) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')
    if (!ctx) { return; }

    ctx.drawImage(img.img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.img.width, img.img.height);
    const colors = filter.replacement.colors;

    const hexMap = new Map(Object.entries(colors).map(([oldHex, color]) => {
      const newGroup = (filter.newColorGroup + color.colorDelta) % ColorGroupCount as ColorGroup;
      const newHex = DefaultColorForPallete[newGroup][color.colorType];
      return [oldHex, newHex];
    }));

    for (let i = 0; i < imgData.data.length; i += 4) {
      const
        r = imgData.data[i],
        g = imgData.data[i+1],
        b = imgData.data[i+2];
      
      const thisHex = RGBToHexString({r, g, b});
      let replace = hexMap.get(thisHex);
      if (replace) {
        const newRGB = HexStringToRGB(replace);
        imgData.data[i]    = newRGB.r;
        imgData.data[i+1]  = newRGB.g;
        imgData.data[i+2]  = newRGB.b;
      }
    }

    ctx.putImageData(imgData, 0, 0)

    const dataURL = canvas.toDataURL();
    const newImg = await LoadImage(dataURL);

    return {
      img: newImg,
      adjustments: img.adjustments,
    };
  };
}

/**
 * A helper method used to load an image from a source to an {@link HTMLImageElement}. This method
 * guarantees that the image is loaded (or that the load failed) before returning.
 * @param src The source for the image. This can be a data URL, or a direct link.
 * @returns The image rendered as an {@link HTMLImageElement}.
 */
export function LoadImage(src: string): Promise<HTMLImageElement> {
  // https://stackoverflow.com/a/66180709/17503966
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    img.crossOrigin = 'anonymous';
  });
}

export type DrawingCoords = {
  x: number;
  y: number;
}

export function CalculateDrawingCoords(
  layer: DrawingCoords,
  layout?: DrawingCoords,
  adjustments?: DrawingCoords,
): DrawingCoords {
  let x = ImageCentering, y = ImageCentering;
    
  // Layouts are relative positions from the body to the "focal point" of the part. For example,
  // we could have -2/+3 for our X/Y, which would mean that the focal point of the given part is
  // 2 pixels left, and 3 pixels down from the focal point of the body.
  if (layout) {
    x += layout.x;
    y += layout.y;
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
  if (adjustments) {
    x += adjustments.x;
    y += adjustments.y;
  }

  return {x, y}
}

/**
 * A helper method used to process the components of a character image into a singular image on the
 * provided {@link canvas}.
 * @param canvas The canvas that the image should be drawn upon.
 * @param cmds A list of processing commands that contain information about what to draw.
 * @param character The character state as taken from the {@link CharacterSelectionContext}.
 */
export async function ProcessImages(
  canvas: HTMLCanvasElement,
  cmds: DrawCommand[],
  layouts: { [Property in keyof typeof PartType]?: BodyLayout_Client },
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  const imgPromises = cmds.map(async (c) => {
    if (!c.part) { return undefined; }
    
    const imgUrl = c.part.src;
    const image = await LoadImage(imgUrl);

    let processed: ProcessedImage = { img: image, adjustments: { x: 0, y: 0 } };
    for (let process of c.postProcessing) {
      processed = await process(processed) ?? processed;
    }

    const layout = layouts[c.part.partType as PartType];
    const coords = CalculateDrawingCoords(
      {
        x: c.part.anchorX,
        y: c.part.anchorY,
      },
      layout && {
        x: layout.anchorX,
        y: layout.anchorY,
      },
      processed.adjustments && {
        x: processed.adjustments.x,
        y: processed.adjustments.y,
      },
    )

    return {
      x: coords.x,
      y: coords.y,
      partType: c.part.partType,
      processed,
      image,
    } as ImageLayer;
  });

  const layers = (await (Promise.all(imgPromises))).filter(Boolean) as ImageLayer[];

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

  const outlineImage = await DrawOutlineProcessing({img: outlineCanvas, adjustments: {x: 0, y: 0}});

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

"use client";

import { CharacterSelectionContext } from "@/lib/character-selection-context";
import { BodyPartImage, CharacterState } from "@/lib/character-selection-reducer";
import { PartType } from "@prisma/client";
import { useContext, useLayoutEffect, useRef } from "react"

/**
 * A function that accepts an {@link HTMLImageElement}, performs some actions to transform it, then
 * returns the a new, modified image.
 */
type PostProcessing = (img: HTMLImageElement) => Promise<HTMLImageElement | undefined>;

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

  const canvas = new HTMLCanvasElement();
  const ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  let dArr = [
    -1, -1,
     0, -1,
     1, -1,
    -1,  0,
     1,  0,
    -1,  1,
     0,  1,
     1,  1,
  ],
    s = 2,
    i = 0,
    x = 5,
    y = 5;

  for (; i < dArr.length; i+= 2) {
    ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);
  }

  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(img, x, y);

  const dataURL = canvas.toDataURL();
  const newImg = await LoadImage(dataURL);

  return newImg;
}

/**
 * A helper method used to process the components of a character image into a singular image on the
 * provided {@link canvas}.
 * @param canvas The canvas that the image should be drawn upon.
 * @param cmds A list of processing commands that contain information about what to draw.
 * @param character The character state as taken from the {@link CharacterSelectionContext}.
 */
async function ProcessImages(canvas: HTMLCanvasElement, cmds: DrawCommand[], character: CharacterState) {
  const imgPromises = cmds.map(async (cmd) => {
    if (!cmd.image) { return; }

    const imgb64 = cmd.image.image.toString('base64');
    const imgUrl = `data:image/png;base64,${imgb64}`;
    let img = await LoadImage(imgUrl);
    
    for (let process of cmd.postProcessing) {
      img = await process(img) ?? img;
    }

    return {
      anchorX: cmd.image.anchorX,
      anchorY: cmd.image.anchorY,
      partType: cmd.image.partType,
      image: img,
    };
  });

  const images = (await (Promise.all(imgPromises))).filter(Boolean);
  
  const ctx = canvas.getContext("2d");
  if (!ctx) { return; }

  const layouts = new Map(character.Layouts.map((l) => [l.partType, l]));
  const bodyAnchor = layouts.get(PartType.Body);

  if (!bodyAnchor) {
    console.warn("No body anchor found");
    return;
  }

  for (let img of images) {
    const layout = layouts.get(img!.partType)
    const x = bodyAnchor.anchorX + (layout?.anchorX ?? 0) - img!.anchorX;
    const y = bodyAnchor.anchorY + (layout?.anchorY ?? 0) - img!.anchorY;
    
    ctx.drawImage(img!.image, x, y);
  }
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

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const { Parts } = character;
    const drawCmds: DrawCommand[] = [
      {
        image: Parts.LeftArm,
        postProcessing: [DrawOutline],
      },
      {
        image: Parts.LeftLeg,
        postProcessing: [DrawOutline],
      },
      { image: Parts.Body, postProcessing: [] },
      { image: Parts.Head, postProcessing: [] },
      { image: Parts.FacialHair, postProcessing: [] },
      { image: Parts.Hair, postProcessing: [] },
      { image: Parts.HairAccessory, postProcessing: [] },
      { image: Parts.Eyes, postProcessing: [] },
      { image: Parts.FaceAccessory, postProcessing: [] },
      { image: Parts.RightLeg, postProcessing: [] },
      { image: Parts.RightArm, postProcessing: [] },
    ];

    for (let cmd of drawCmds) {
      if (!cmd.image) { continue; }
      
      const imgb64 = cmd.image.image.toString('base64');
      const imgUrl = `data:image/png;base64,${imgb64}`;

      LoadImage(imgUrl)
    }

    ProcessImages(canvasRef.current, drawCmds, character);
  }, [canvasRef, character]);

  return (
    <canvas className="h-full" ref={canvasRef}/>
  )
}

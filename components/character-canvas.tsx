"use client";

import { DrawCommand, ProcessedImage, LoadImage, DrawOutline, CalculateDrawingCoords, ImageCentering, ImageScaling, ImageLayer } from "@/lib/canvas-processing";
import { CharacterSelectionContext } from "@/lib/character-selection-context";
import { CharacterState } from "@/lib/character-selection-reducer";
import { useContext, useLayoutEffect, useRef } from "react"

/**
 * A helper method used to process the components of a character image into a singular image on the
 * provided {@link canvas}.
 * @param canvas The canvas that the image should be drawn upon.
 * @param cmds A list of processing commands that contain information about what to draw.
 * @param character The character state as taken from the {@link CharacterSelectionContext}.
 */
async function ProcessImages(canvas: HTMLCanvasElement, cmds: DrawCommand[], character: CharacterState) {
  const ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  const layouts = new Map(character.Layouts.map((l) => [l.partType, l]));

  const imgPromises = cmds.map(async (c) => {
    if (!c.image) { return undefined; }
    
    const imgb64 = c.image.encImage;
    const imgUrl = `data:image/png;base64,${imgb64}`;
    const image = await LoadImage(imgUrl);

    let processed: ProcessedImage = { img: image };
    for (let process of c.postProcessing) {
      processed = await process(processed) ?? processed;
    }

    const layout = layouts.get(c.image.partType);
    const coords = CalculateDrawingCoords(
      {
        x: c.image.anchorX,
        y: c.image.anchorY,
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
      partType: c.image.partType,
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

  const outlineImage = await DrawOutline({img: outlineCanvas});

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

    ProcessImages(canvasRef.current, drawCmds, character);
  }, [canvasRef, character]);

  return (
    <canvas className="h-full" ref={canvasRef}/>
  )
}

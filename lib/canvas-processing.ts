import { PartType } from "@prisma/client";
import { BodyPartImage, StateLayout } from "./character-selection-reducer";

export const ImageCentering = 32;
export const ImageScaling = 4;

export type ImageLayer = {
  x: number;
  y: number;
  processed: ProcessedImage;
  partType?: PartType;
  image?: HTMLImageElement;
}

/**
 * A container for an image that has been processed. Includes the source element in addition to any
 * adjustments that might need to be included when rendering the final image.
 */
export type ProcessedImage = {
  /**
   * The image that will be processed, or has been processed.
   */
  img: CanvasImageSource;

  /**
   * A set of adjustments made to the image that need to be noted when rendering the final image.
   */
  adjustments?: {
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
export const DrawOutline: PostProcessing = async (img) => {
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

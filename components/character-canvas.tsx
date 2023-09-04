"use client";

import { DrawOutline, SortDrawingLayers, ProcessImages } from "@/lib/canvas-processing";
import { useLayoutSelector, useOutfitSelector } from "@/lib/store";
import { useLayoutEffect, useRef } from "react"

/**
 * A canvas used to render a character's image.
 */
export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character = useOutfitSelector();
  const layouts = useLayoutSelector();

  useLayoutEffect(() => {
    if (!canvasRef.current || !character) {
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const drawCmds = SortDrawingLayers(
      character,
      {
        'LeftArm': [DrawOutline],
        'LeftLeg': [DrawOutline],
      }
    )

    ProcessImages(canvasRef.current, drawCmds, layouts);
  }, [canvasRef, character]);

  return (
    <canvas className="h-full" ref={canvasRef}/>
  )
}

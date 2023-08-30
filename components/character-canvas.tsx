"use client";

import { CharacterSelectionContext } from "@/app/character-selection-context";
import { BodyPartImage } from '@/app/character-selection-reducer';
import { useContext, useLayoutEffect, useRef } from "react"

export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character = useContext(CharacterSelectionContext);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const parts: (BodyPartImage | undefined)[] = [
      character?.Parts.Hair,
    ];

    // const definedParts = parts.filter(Boolean) as BodyPartImage[];
    // for (let part of definedParts) {
    //   const img = new Image(32, 32)
    //   img.src = part.url;
    //   ctx.drawImage(img, part.anchorX, part.anchorY);
    // }

    ctx.clearRect(0, 0, 300, 200);

    parts
      .filter(Boolean)
      .map((p) => {
        const img = new Image(32, 32);
        img.style.width = "auto";
        img.style.height = "auto";
        img.onload = () => {
          ctx.drawImage(img, p!.anchorX, p!.anchorY)
        };
        img.onerror = (err) => {
          console.error(err);
        };
        img.src = p!.url;
      });

    ctx.fillStyle = "#FF00FF";
    ctx.fillRect(50, 50, 20, 20);
  }

  useLayoutEffect(() => {
    if (canvasRef.current && character) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        draw(ctx);
      }
    }
  }, [draw, character])


  return (
    <canvas ref={canvasRef}/>
  )
}

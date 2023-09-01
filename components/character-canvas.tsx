"use client";

import { CharacterSelectionContext } from "@/lib/character-selection-context";
import { BodyPartImage } from '@/lib/character-selection-reducer';
import { BodyLayout, BodyPart } from "@prisma/client";
import { useContext, useLayoutEffect, useRef } from "react"

export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character = useContext(CharacterSelectionContext);

  // useLayoutEffect(() => {
  //   if (canvasRef.current && character) {
  //     const ctx = canvasRef.current.getContext('2d');
  //     if (ctx) {
  //       // const parts: (BodyPartImage | undefined)[] = [
  //       //   character?.Parts.Hair,
  //       // ];
    
  //       ctx.clearRect(0, 0, 300, 200);
    
  //       parts
  //         .filter(Boolean)
  //         .map((p) => {
  //           const img = new Image(32, 32);
  //           img.style.width = "auto";
  //           img.style.height = "auto";

  //           img.onload = () => {
  //             ctx.drawImage(img, p!.anchorX, p!.anchorY)
  //           };

  //           img.onerror = (err) => {
  //             console.error(err);
  //           };

  //           img.src = p!.url;
  //         });
    
  //       ctx.fillStyle = "#FF00FF";
  //       ctx.fillRect(50, 50, 20, 20);
  //     }
  //   }
  // }, [character])


  return (
    <canvas ref={canvasRef}/>
  )
}

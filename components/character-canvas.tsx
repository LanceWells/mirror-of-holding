'use client';

import { DrawOutlineProcessing, SortDrawingLayers, ProcessImages, PostProcessing, ConstructColorReplacementProcessing } from '@/lib/canvas-processing';
import { useFilters, useLayoutSelector, useOutfitSelector } from '@/lib/store/character-body';
import { OutfitType, PartType } from '@prisma/client';
import { useEffect, useRef } from 'react';

/**
 * A canvas used to render a character's image.
 */
export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character = useOutfitSelector();
  const layouts = useLayoutSelector();
  const filters = useFilters();

  useEffect(() => {
    if (!canvasRef.current || !character) {
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const processing: { [Property in keyof typeof PartType]?: PostProcessing[] } = {
      'LeftArm': [DrawOutlineProcessing],
      'LeftLeg': [DrawOutlineProcessing],
    };

    for (let [outfitType, filter] of Object.entries(filters)) {
      if (!filter) {
        continue;
      }

      const outfit = character[outfitType as keyof typeof OutfitType];
      if (!outfit) {
        continue;
      }

      for(let [partType, part] of Object.entries(outfit)) {
        if (!part) {
          continue;
        }

        const colorReplacement = ConstructColorReplacementProcessing(filter);
        const thisProcessing = processing[partType as keyof typeof PartType] ?? [];
        thisProcessing.push(colorReplacement);
  
        processing[partType as keyof typeof PartType] = thisProcessing;
      }
    }

    const drawCmds = SortDrawingLayers(
      character,
      processing,
    );

    ProcessImages(
      canvasRef.current,
      drawCmds,
      layouts,
    );
  }, [canvasRef, character, filters, layouts]);

  return (
    <canvas className="h-full" ref={canvasRef}/>
  );
}

'use client';

import { useCardVisibilitySelector, useDrawerOpenSelector, useHaulSelector } from '@/lib/store/treasure-haul';
import { Sprite, Stage, useTick } from '@pixi/react';
import { BaseTexture, SCALE_MODES, Texture } from 'pixi.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function PixiOverlay() {
  // const canvasIDs = useCardVisibilitySelector();
  // const haul = useHaulSelector();
  // const drawerState = useDrawerOpenSelector();

  // const [shouldRecalcBounds, setShouldRecalcBounds] = useState(false);
  // // const [cardImages, setCardImages] = useState<{
  // //   [canvasKey: string]: {
  // //     boundingRect: DOMRect;
  // //   }
  // // }>({});

  // const cardImages = useRef<{
  //   [canvasKey: string]: {
  //     boundingRect: DOMRect;
  //   }
  // }>({});

  // const recalculateBoundingBoxes = useCallback(() => {
  //   setShouldRecalcBounds(true);
  //   setTimeout(() => { setShouldRecalcBounds(false); }, 1000);
  // }, []);

  // const resizeObserver = useRef<ResizeObserver | null>(
  //   new ResizeObserver(() => recalculateBoundingBoxes())
  // );

  // // const recalculateBoundingBoxes = useCallback(() => {
  // //   const canvases = document.querySelectorAll('[data-item-card') as NodeListOf<HTMLCanvasElement>;
  // //   const newBoxes = [...canvases.values()].map((c) =>
  // //     [`${c.id}`, { boundingRect: c.getBoundingClientRect() }]
  // //   );

  // //   setCardImages(Object.fromEntries(newBoxes));
  // // }, []);

  // // useEffect(() => {
  // //   recalculateBoundingBoxes();
  // //   resizeObserver.current = new ResizeObserver(() => recalculateBoundingBoxes());
  // //   if ()
  // // }, [canvasIDs, drawerState, recalculateBoundingBoxes]);

  // useEffect(() => {
  //   recalculateBoundingBoxes();
  // }, [canvasIDs, drawerState, recalculateBoundingBoxes]);

  // useTick((delta) => {
  //   if (shouldRecalcBounds) {
  //     const canvases = document.querySelectorAll('[data-item-card') as NodeListOf<HTMLCanvasElement>;
  //     const newBoxes = [...canvases.values()].map((c) =>
  //       [`${c.id}`, { boundingRect: c.getBoundingClientRect() }]
  //     );

  //     cardImages.current = Object.fromEntries(newBoxes);
  //   }
  // });

  // const sprites = useMemo(() => Object.entries(cardImages.current).map(([key, card]) => {
  //   const itemKey = canvasIDs[key];
  //   const item = haul[itemKey?.itemKey];

  //   const texture = new Texture(
  //     new BaseTexture(item.src, {
  //       scaleMode: SCALE_MODES.NEAREST,
  //     })
  //   );

  //   return (
  //     <Sprite
  //       key={key}
  //       x={card.boundingRect.x}
  //       y={card.boundingRect.y}
  //       width={card.boundingRect.width}
  //       height={card.boundingRect.height}
  //       texture={texture}
  //     />
  //   );
  // }), [cardImages, haul, canvasIDs]);

  return (
    <></>
    // <Stage
    //   className='fixed top-0 pointer-events-none z-[9999]'
    //   width={window.innerWidth}
    //   height={innerHeight}
    //   options={{
    //     backgroundAlpha: 0,
    //     antialias: false,
    //     eventMode: 'none',
    //   }}
    // >
    //   {sprites}
    // </Stage>
  );
}

'use client';

import clsx from 'clsx';
import { Application } from 'pixi.js';
import { useRef, useEffect, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import {
  useCardVisibilitySelector,
  useDrawerOpenSelector,
  useHaulSelector,
} from '@/lib/store/treasure-haul';
import { TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import { ParticleState, PixiEffects } from '@/lib/card-render/pixi-effects';

export default function PixiOverlay() {
  const canvasIDs = useCardVisibilitySelector();
  const drawerState = useDrawerOpenSelector();
  const haul = useHaulSelector();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<Application | null>(null);

  const cardsRef = useRef<{
    [canvasKey: string]: {
      sprite: PIXI.Sprite;
      item: TreasureHaulItem;
      state: {
        particles: ParticleState,
      }
    }
  }>({});

  const shouldRecalcBounds = useRef({
    doReset: false,
    timeout: undefined as undefined | NodeJS.Timeout,
  });


  const recalculateBoundingBoxes = useCallback(() => {
    if (shouldRecalcBounds.current.timeout) {
      clearTimeout(shouldRecalcBounds.current.timeout);
    }

    shouldRecalcBounds.current.doReset = true;
    shouldRecalcBounds.current.timeout = setTimeout(() => {
      shouldRecalcBounds.current = {
        doReset: false,
        timeout: undefined,
      };
    }, 1000);
  }, []);

  const resizeObserver = useRef<ResizeObserver | null>(
    null
  );

  useEffect(() => {
    if (ResizeObserver) {
      resizeObserver.current = new ResizeObserver(() => {
        recalculateBoundingBoxes();
      });

      resizeObserver.current.observe(document.body);
    }
  }, [recalculateBoundingBoxes]);

  useEffect(() => {
    recalculateBoundingBoxes();
  }, [canvasIDs, drawerState, recalculateBoundingBoxes]);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return;
    }

    const app = new Application({
      view: canvasRef.current,
      backgroundAlpha: 0,
      resizeTo: window,
    });

    appRef.current = app;
  }, [canvasRef]);

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    const newCanvasKeys = new Set(Object.keys(canvasIDs));
    const oldCanvasKeys = new Set(Object.keys(cardsRef.current));
    const allKeys = new Set([...newCanvasKeys, ...oldCanvasKeys]);

    const app = appRef.current;

    allKeys.forEach((k) => {
      if (oldCanvasKeys.has(k) && !newCanvasKeys.has(k)) {
        // remove
        app.stage.removeChild(cardsRef.current[k].sprite);
        delete cardsRef.current[k];
      } else if (!oldCanvasKeys.has(k) && newCanvasKeys.has(k)) {
        // add
        const thisCanvas = document.getElementById(k);
        if (!thisCanvas) {
          console.log(`couldn't find a canvas for '${k}'`);
          return;
        }

        const itemKey = canvasIDs[k].itemKey;
        const item = haul[itemKey];
        const newSprite = PIXI.Sprite.from(
          item.src,
          {
            width: 128,
            height: 128,
            scaleMode: PIXI.SCALE_MODES.NEAREST,
          },
        );

        const thisBoundingRect = thisCanvas.getBoundingClientRect();
        newSprite.x = thisBoundingRect.x;
        newSprite.y = thisBoundingRect.y;
        newSprite.scale.set(2, 2);

        cardsRef.current[k] = {
          sprite: newSprite,
          item,
          state: {
            particles: {
              container: new PIXI.ParticleContainer(),
              sprites: [],
            }
          }
        };

        app.stage.addChild(newSprite);
      }
    });

    // Don't update on haul. That won't do anything because the visual components that we need to
    // refer to won't exist until canvasIDs is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasIDs]);

  // TODO: on haul change, update the cardsref object so that we can have the updated particle
  // values, and know what to render when the values are changed.

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    const app = appRef.current;
    app.stage.removeChildren();

    if (app.ticker.count <= 1) {
      app.ticker.add((delta) => {
        if (shouldRecalcBounds.current) {
          const canvases = document.querySelectorAll('[data-item-canvas') as NodeListOf<HTMLCanvasElement>;
          canvases.forEach((c) => {
            if (!cardsRef.current[c.id]) {
              return;
            }

            const rect = c.getBoundingClientRect();
            cardsRef.current[c.id].sprite.x = rect.x;
            cardsRef.current[c.id].sprite.y = rect.y;
          });
        }

        Object.entries(cardsRef.current).forEach(([k, v]) => {
          PixiEffects[v.item.effects.type]({
            delta,
            effects: v.item.effects,
            imgs: {
              noise: '',
              particle: '',
              patchyNoise: '',
              src: '/particles/sparkle-gray.png',
            },
            time: Date.now(),
            particles: v.state.particles,
          });
        });

        // bunny.rotation += 0.1 * delta;
      });
    }
  }, [appRef]);

  return (
    <canvas
      className={clsx(
        ['fixed', 'top-0', 'z-40', 'pointer-events-none']
      )}
      ref={canvasRef}
    />
  );
}

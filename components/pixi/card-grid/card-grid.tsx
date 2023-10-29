import { ParticleState, PixiEffects } from '@/lib/card-render/pixi-effects';
import { useCardVisibilitySelector, useHaulSelector } from '@/lib/store/treasure-haul';
import { TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import { Application } from 'pixi.js';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import clsx from 'clsx';

export type PixiCardPreviewProps = {
  resizeTo: MutableRefObject<HTMLElement | null>;
}

export default function PixiCardGrid(props: PixiCardPreviewProps) {
  const {
    resizeTo,
  } = props;

  const canvasIDs = useCardVisibilitySelector();
  const haul = useHaulSelector();

  const rObserverRef = useRef<ResizeObserver | null>(null);
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

  // Create the app on mount. Should only happen once.
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (!resizeTo.current) {
      return;
    }

    const app = new Application({
      view: canvasRef.current,
      backgroundAlpha: 0,
      resizeTo: resizeTo.current,
    });

    app.ticker.add((delta) => {
      const appBounds = resizeTo.current?.getBoundingClientRect();

      if (shouldRecalcBounds.current.doReset && appBounds) {
        const canvases = document.querySelectorAll('[data-item-canvas') as NodeListOf<HTMLCanvasElement>;
        canvases.forEach((c) => {
          if (!cardsRef.current[c.id]) {
            return;
          }

          const rect = c.getBoundingClientRect();
          cardsRef.current[c.id].sprite.x = rect.x - appBounds.x;
          cardsRef.current[c.id].sprite.y = rect.y - appBounds.y;
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
    });

    // Check for ResizeObserver first. It isn't really a problem without this check, but there's
    // some server rendering that happens that causes an error to show up if we don't include this
    // check here.
    if (ResizeObserver) {

      // From what I can tell, the resizeTo works well on a window, but not on element resizing. By
      // observing the element with a ResizeObserver, we can call resize() ourselves when the box
      // changes.
      rObserverRef.current = new ResizeObserver(() => {
        if (!appRef.current || !resizeTo.current) {
          return;
        }

        appRef.current.resize();
        recalculateBoundingBoxes();
      });

      rObserverRef.current.observe(resizeTo.current);
    }

    if (appRef.current) {
      appRef.current.destroy();
    }

    appRef.current = app;
  }, [canvasRef, resizeTo, recalculateBoundingBoxes]);

  // When our haul changes, then this container needs to update to reflect that.
  useEffect(() => {
    if (!appRef.current || !resizeTo.current) {
      return;
    }

    const newCanvasKeys = new Set(Object.values(canvasIDs));
    const oldCanvasKeys = new Set(Object.keys(cardsRef.current));
    const allKeys = new Set([...newCanvasKeys, ...oldCanvasKeys]);

    const app = appRef.current;
    const appBounds = resizeTo.current.getBoundingClientRect();

    [...allKeys.values()].forEach((k) => {
      if (oldCanvasKeys.has(k) && !newCanvasKeys.has(k)) {
        // Remove

        app.stage.removeChild(cardsRef.current[k].sprite);
        delete cardsRef.current[k];
      } else if (!oldCanvasKeys.has(k) && newCanvasKeys.has(k)) {

        // Add
        const thisCanvas = document.getElementById(k);
        if (!thisCanvas) {
          console.log(`couldn't find a canvas for '${k}'`);
          return;
        }

        const itemKey = k;
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
        newSprite.x = thisBoundingRect.x - appBounds.x;
        newSprite.y = thisBoundingRect.y - appBounds.y;

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
      } else {
        // this is an existing canvas, and because we're rendering things in a grid, it means that
        // we'll need to update the positions of at least the items on the same row (which, that's
        // a lot to calculate), so we re-evaluate every existing item.

        const thisCanvas = document.getElementById(k);
        if (!thisCanvas) {
          console.log(`couldn't find a canvas for '${k}'`);
          return;
        }

        const thisBoundingRect = thisCanvas.getBoundingClientRect();
        cardsRef.current[k].sprite.x = thisBoundingRect.x - appBounds.x;
        cardsRef.current[k].sprite.y = thisBoundingRect.y - appBounds.y;
      }
    });
    // Don't update on haul. That won't do anything because the visual components that we need to
    // refer to won't exist until canvasIDs is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasIDs, resizeTo]);

  useEffect(() => {
    Object.entries(cardsRef.current).forEach(([k, v]) => {
      v.item = Object.assign({}, haul[k]);
    });
  }, [haul]);

  return (
    <canvas
      className={clsx(
        'absolute top-0',
        'pointer-events-none',
      )}
      ref={canvasRef}
    />
  );
}

'use client';

import { LoadImage } from '@/lib/canvas-processing';
import { renderWithCanvasCtx, renderWithWebGL2Ctx } from '@/lib/card-render/card-render';
import { removeCardVisibility, setCardVisibility } from '@/lib/store/treasure-haul';
import {
  ItemEffectFlaming,
  ItemEffectOptions,
  ItemEffectUniformParticles,
  ItemToCardBack,
  TreasureHaulItem,
} from '@/lib/treasurehaul/treasure-haul-payload';
import { TrigOptimizer } from '@/lib/trigopt/trig-optimizer';
import clsx from 'clsx';
import { MedievalSharp } from 'next/font/google';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export type ItemCardProps = {
  item: TreasureHaulItem;
  itemKey: string;
  className?: string;
  onClick?: (itemKey: string) => void;
}

type Emitter = {
  particles: {
    x0: number,
    y0: number,
    xv0: number,
    yv0: number,
    xAcc: number,
    yAcc: number,
    createdAt: number,
    rotation: number,
  }[]
}

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export default function ItemCard(props: ItemCardProps) {
  const {
    item,
    itemKey,
    onClick,
    className,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgs, setImgs] = useState<{
    src?: HTMLImageElement,
    noise?: HTMLImageElement,
    patchyNoise?: HTMLImageElement,
    particle?: HTMLImageElement,
  }>({});

  const dispatch = useDispatch();

  // We could have two cards with the same item key if one is visible in a drawer. That would give
  // us multiple elements to observe. Make a unique key here instead.
  const canvasKey = useMemo(() => {
    return `${itemKey}_${Math.floor(Math.random() * 10000000)}`;
  }, [itemKey]);

  useEffect(() => {
    if (item.effects.type === 'webgl2') {
      renderWithWebGL2Ctx(
        canvasRef,
        imgs,
        item,
        Effects,
      );
    } else {
      renderWithCanvasCtx(
        canvasRef,
        imgs,
        item,
        Effects,
      );
    }
  }, [canvasRef, imgs, item, itemKey]);

  // For use with the pixijs overlay. This lets us notify the overlay that we now have a rendered
  // item card that can be watched.
  useEffect(() => {
    dispatch(setCardVisibility({
      canvasKey,
      itemKey,
    }));

    return (() => {
      dispatch(removeCardVisibility({
        canvasKey,
      }));
    });

    // return (() => {
    //   dispatch(setCardVisibility({
    //     canvasKey,
    //     itemKey,
    //   }));
    // });
  }, [canvasKey, itemKey, dispatch]);

  const loadImages = useCallback(async () => {
    const [src, noise, patchyNoise, particle] = await Promise.all([
      LoadImage(item.src),
      LoadImage('/noise.png'),
      LoadImage('/firenoise.png'),
      // TODO: load this from uniform.
      LoadImage('/particles/sparkle-gray.png'),
    ]);

    setImgs({
      src,
      noise,
      patchyNoise,
      particle,
    });
  }, [item.src]);


  useEffect(() => { loadImages(); }, [
    itemKey,
    item.src,
    loadImages,
  ]);

  const cardBack = ItemToCardBack[item.type];

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick(itemKey);
        }
      }}
      className={
        clsx(
          className,
          onClick
            ? ['dark:hover:border-cyan-100', 'hover:border-cyan-600']
            : ['pointer-events-none'],
          'drop-shadow-md',
          'transition-all',
          'rounded-xl',
          'border-4',
          'border-transparent',
          'w-[192px]',
          'h-[256px]',
          'grid',
          'grid-rows-[min-content_1fr]',
          'gap-y-6',
          'm-2',
          'bg-no-repeat',
          'bg-center',
          'bg-cover',
          'items-center',
        )}
      style={{
        backgroundImage: cardBack,
        animationFillMode: 'both',
      }}
    >
      <canvas
        // // These data items let us query the exact bounding box of the canvas from another
        // // component. The reason that we're doing this (which may seem hacky), is that it is a more
        // // optimized option to get the box of an item versus saving this into something like a redux
        // // store. Furthermore, this gets us the *precise* window coordinates for these items, rather
        // // than the assumed location.
        // data-item-canvas
        // data-item-key={itemKey}
        id={canvasKey}
        data-item-canvas
        className={clsx(
          'rounded-lg',
          'justify-self-center',
          'border-none',
          // The card border needs some small adjustments. The scaling makes
          // a precise CSS placement tough without these translations.
          'translate-y-[2px]',
        )}
        height={128}
        width={128}
        ref={canvasRef}
      />
      <h3 className={clsx(
        medievalSharp.className,
        'text-white',
        'border-none',
        'text-center',
        'drop-shadow-[0_1.2px_1.2px_rgb(0,0,0)]',
        'justify-self-center',
        'w-full',
        'align-bottom',
        'text-ellipsis',
        'z-10',
      )}>
        {item.itemName}
      </h3>
    </button>
  );
}

const Effects: {
  [P in ItemEffectOptions]: (params: {
    ctx: CanvasRenderingContext2D,
    imgs: {
      src: HTMLImageElement,
      noise: HTMLImageElement,
      patchyNoise: HTMLImageElement,
      particle: HTMLImageElement,
    },
    time: number,
    delta: number,
    offscreenCtx: OffscreenCanvasRenderingContext2D,
    effects: TreasureHaulItem['effects'],
    emitter: Emitter,
  }) => void
} = {
  /**
   * This effect should emulate the enchanted Minecraft item style. Right now it achieves this by
   * slowly scrolling a parallaxing noise across the image, and performing a color-dodge on the
   * existing sprite.
   */
  enchanted: ({ ctx, imgs, time }) => {
    const timeIter = time * 0.035 % 128;
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);

    ctx.globalAlpha = 0.4;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(imgs.noise, timeIter, 0, 128, 128);
    ctx.drawImage(imgs.noise, timeIter - 128, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  /**
   * This should look like the top portion of the sprite is on fire.
   * 
   * This is achieved by:
   * - Drawing the sprite, offset upwards by N pixels.
   * - Drawing the 'patchy' noise on top of this sprite. The patchy noise contains a lot of
   *   transparent space, so the flame effect will appear and disappear. We also draw this noise
   *   in two 'patches', so that we can move from one patch to the other without resetting the
   *   animation. Think a 64x128 patch where we always have more room above.
   * - Drawing a gradient over the noise, using the color uniform.
   * - Drawing the original image back on to the canvas.
   */
  flaming: ({ ctx, imgs, time, offscreenCtx, effects }) => {
    const timeIter = time * 0.035 % 128;
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, -8, 128, 128);

    offscreenCtx.clearRect(0, 0, 128, 128);
    offscreenCtx.drawImage(imgs.patchyNoise, 0, 128 - timeIter, 128, 128);
    offscreenCtx.drawImage(imgs.patchyNoise, 0, 0 - timeIter, 128, 128);

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(offscreenCtx.canvas, 0, 0);

    const midTone = (effects as ItemEffectFlaming).uniforms.color ?? { r: 255, g: 0, b: 0 };
    const shade = {
      r: Math.floor(midTone.r / 2),
      g: Math.floor(midTone.r / 2),
      b: Math.floor(midTone.r / 2),
    };
    const tint = {
      r: Math.min(midTone.r * 1.25, 255),
      g: Math.min(midTone.r * 1.25, 255),
      b: Math.min(midTone.r * 1.25, 255),
    };

    const gradient = ctx.createLinearGradient(128, 128, 0, 0);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, `rgb(${tint.r}, ${tint.g}, ${tint.b})`);
    gradient.addColorStop(0.6, `rgb(${midTone.r}, ${midTone.g}, ${midTone.b})`);
    gradient.addColorStop(0.7, `rgb(${shade.r}, ${shade.g}, ${shade.b})`);
    gradient.addColorStop(0.9, 'black');

    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  /**
   * This was almost made by mistake. The goal was to create particle emission as a consequence of
   * time. Though, I abandoned that idea after recognizing that industry standard shader effects
   * actually persist state across frames. I also had to acknowledge that unless I calculate the
   * particle state as a direct consequence of time at which a frame elapsed, I wouldn't know how
   * to draw two frames with a particle in the exact same location.
   * 
   * Otherwise, this works by using a lot of sin/cos logic to make the sparkles move in a neat lil
   * pattern.
   */
  sparkles: ({ ctx, imgs, time, effects }) => {
    const theseEffects = effects.uniforms as ItemEffectUniformParticles;

    ctx.clearRect(0, 0, 128, 128);

    const particles: {
      x: number,
      y: number,
    }[] = [];

    const timeIter = time * 0.035 % 128;
    for (let i = 1; i <= theseEffects.particleFrequency; i++) {
      const radians = (2 * Math.PI / 128) * timeIter + (2 * Math.PI * i / theseEffects.particleFrequency);
      const distanceRadians = (2 * Math.PI / 128 * timeIter);

      const x = theseEffects.emitterX
        + (Math.cos(radians) * theseEffects.emitterRadius)
        * Math.sin(distanceRadians);

      const y = theseEffects.emitterY
        + (Math.sin(radians) * theseEffects.emitterRadius)
        * Math.sin(distanceRadians);

      particles.push({ x, y });
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
    particles.forEach((p) => {
      ctx.drawImage(imgs.particle, p.x, p.y, imgs.particle.width * 2, imgs.particle.height * 2);
    });
  },

  particles: ({ ctx, imgs, time, delta, effects, emitter, offscreenCtx }) => {
    const eff = effects.uniforms as ItemEffectUniformParticles;
    ctx.clearRect(0, 0, 128, 128);

    /**
     * position as a function of acc is:
     * p = a * (1/2)t^2 + s0 + (v0 * t)
     * 
     * this translates into:
     * xPos = xAcc * 0.5 * (time - createdAt) + x0 + (v0 * (time - createdAt))
     */

    emitter.particles = emitter.particles
      .filter((p) => (time - p.createdAt) < eff.particleLifetime);

    // pfreq = 10; 10 pps. Every 1000 / pfreq we should have 1.
    const t = 1000 / eff.particleFrequency;

    // particles now - particles then
    const particlesToCreate = Math.floor(time / t) - Math.floor((time - delta) / t);


    for (let i = 0; i < particlesToCreate; i++) {
      const dirVariance = (eff.emitterCone / 2) - (Math.random() * eff.emitterCone);
      const direction = eff.emitterDirection + dirVariance;

      const particle: Emitter['particles'][number] = {
        x0: (Math.random() - 0.5) * eff.emitterRadius + eff.emitterX,
        y0: (Math.random() - 0.5) * eff.emitterRadius + eff.emitterY,
        xv0: (TrigOptimizer.sin(direction) * eff.particleSpeed),
        yv0: (TrigOptimizer.cos(direction) * eff.particleSpeed),
        xAcc: 0,
        yAcc: 0,
        createdAt: (time - delta + (t * i)),
        rotation: direction,
      };

      emitter.particles.push(particle);
    }

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);

    emitter.particles.forEach((p) => {
      const elapsedTime = time - p.createdAt;
      const x = (p.xAcc * 0.5 * elapsedTime) + p.x0 + (p.xv0 * elapsedTime);
      const y = (p.yAcc * 0.5 * elapsedTime) + p.y0 + (p.yv0 * elapsedTime);

      const lifePercentage = elapsedTime / eff.particleLifetime;
      const scale = eff.startSize + (eff.endSize - eff.startSize) * lifePercentage;
      const color = {
        r: eff.startColor.r + (eff.endColor.r - eff.startColor.r) * lifePercentage,
        g: eff.startColor.g + (eff.endColor.g - eff.startColor.g) * lifePercentage,
        b: eff.startColor.b + (eff.endColor.b - eff.startColor.b) * lifePercentage,
        a: eff.startColor.a + (eff.endColor.a - eff.startColor.a) * lifePercentage,
      };

      const xCenter = x + (imgs.particle.width / 2);
      const yCenter = y + (imgs.particle.height / 2);
      ctx.globalCompositeOperation = 'source-over';
      offscreenCtx.translate(xCenter, yCenter);
      offscreenCtx.rotate(p.rotation);
      offscreenCtx.scale(scale, scale);
      offscreenCtx.translate(-xCenter, -yCenter);
      offscreenCtx.drawImage(imgs.particle, x, y, imgs.particle.width, imgs.particle.height);
      offscreenCtx.resetTransform();

      offscreenCtx.globalCompositeOperation = 'source-atop';
      // offscreenCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      offscreenCtx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      offscreenCtx.fillRect(0, 0, 128, 128);

      ctx.drawImage(offscreenCtx.canvas, 0, 0);
      offscreenCtx.globalCompositeOperation = 'source-over';
      offscreenCtx.clearRect(0, 0, 128, 128);
    });
  },

  none: ({ ctx, imgs }) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  webgl2: () => {

  },
};

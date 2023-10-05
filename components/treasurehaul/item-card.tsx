"use client";

import { LoadImage } from "@/lib/canvas-processing";
import { ItemEffectFlaming, ItemEffectOptions, TreasureHaulItem } from "@/lib/treasurehaul/treasure-haul-payload";
import clsx from "clsx";
import { MedievalSharp } from "next/font/google";
import { useEffect, useRef, useState } from "react";

export type ItemCardProps = {
  item: TreasureHaulItem;
  itemKey: string;
  onClick?: (itemKey: string) => void;
}

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export default function ItemCard(props: ItemCardProps) {
  const {
    item,
    itemKey,
    onClick,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [imgs, setImgs] = useState<{
    src?: HTMLImageElement,
    noise?: HTMLImageElement,
    patchyNoise?: HTMLImageElement,
  }>({});

  useEffect(() => {
    if (
      !canvasRef || !canvasRef.current ||
      !imgs || !imgs.noise || !imgs.src
    ) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    const offscreenCtx = new OffscreenCanvas(128, 128).getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = false;

    let time = 0;
    timerRef.current = setInterval(() => {
      time += 0.7;
      time %= 128;
      Effects[item.effects.type]({
        ctx,
        src: imgs.src!,
        noise: imgs.noise!,
        patchyNoise: imgs.patchyNoise!,
        time,
        offscreenCtx: offscreenCtx!,
        effects: item.effects,
      });
    }, 30);
    
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout)
      timerRef.current = null;
    };
  }, [canvasRef, imgs, item, itemKey]);

  const loadImages = async () => {
    const [src, noise, patchyNoise] = await Promise.all([
      LoadImage(item.src),
      LoadImage('/noise.png'),
      LoadImage('/firenoise.png'),
    ]);

    setImgs({
      src,
      noise,
      patchyNoise,
    })
  }

  useEffect(() => { loadImages(); }, [
    itemKey,
    item.src,
  ]);

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick(itemKey)
        }
      }}
      className={clsx(
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
        backgroundImage: 'url(/cards/weapon.png)',
        animationFillMode: 'both',
        // animationDelay: '2500ms',
      }}
    >
      <canvas
        className={clsx(
          'rounded-lg',
          'justify-self-center',
          'border-none',
          // The card border needs some small adjustments. The scaling makes
          // a precise CSS placement tough without these translations.
          '-translate-x-[0.1px]',
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
    src: HTMLImageElement,
    noise: HTMLImageElement,
    patchyNoise: HTMLImageElement,
    time: number,
    offscreenCtx: OffscreenCanvasRenderingContext2D,
    effects: TreasureHaulItem['effects'],
  }) => void
} = {
  enchanted: ({ctx, src, noise, time}) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0, 128, 128);
  
    ctx.globalAlpha = 0.4;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(noise, time, 0, 128, 128);
    ctx.drawImage(noise, time - 128, 0, 128, 128);
  
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.drawImage(src, 0, 0, 128, 128);
  },

  flaming: ({ctx, src, patchyNoise, time, offscreenCtx, effects}) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, -8, 128, 128);

    offscreenCtx.clearRect(0, 0, 128, 128);
    offscreenCtx.drawImage(patchyNoise, 0, 128 - time, 128, 128);
    offscreenCtx.drawImage(patchyNoise, 0, 0 - time, 128, 128);

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(offscreenCtx.canvas, 0, 0);

    const midTone = (effects as ItemEffectFlaming).uniforms.color ?? { r: 255, g: 0, b: 0 };
    const shade = {
      r: Math.floor(midTone.r / 2),
      g: Math.floor(midTone.r / 2),
      b: Math.floor(midTone.r / 2),
    }
    const tint = {
      r: Math.min(midTone.r * 1.25, 255),
      g: Math.min(midTone.r * 1.25, 255),
      b: Math.min(midTone.r * 1.25, 255),
    }

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
    ctx.drawImage(src, 0, 0, 128, 128);
  },

  none: ({ctx, src}) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0, 128, 128);
  }
}


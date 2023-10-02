"use client";

import { LoadImage } from "@/lib/canvas-processing";
import { TreasureHaulItem, TreasureHaulItemEffectType } from "@/lib/treasurehaul/treasure-haul-payload";
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
      Effects[item.effects](
        ctx,
        imgs.src!,
        imgs.noise!,
        imgs.patchyNoise!,
        time,
        offscreenCtx!,
      );
    }, 30);
    
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [canvasRef, imgs, item]);

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

  useEffect(() => { loadImages(); }, []);

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick(itemKey)
        }
      }}
      className={clsx(
        onClick
          ? ['hover:border-slate-100']
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
      style={{ backgroundImage: 'url(/cards/weapon.png)' }}
    >
      <canvas
        className={clsx(
          'rounded-lg',
          'justify-self-center',
          'border-none',
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
  [P in keyof typeof TreasureHaulItemEffectType]: (
    ctx: CanvasRenderingContext2D,
    src: HTMLImageElement,
    noise: HTMLImageElement,
    patchyNoise: HTMLImageElement,
    time: number,
    offscreenCanvas: OffscreenCanvasRenderingContext2D,
  ) => void
} = {
  Enchanted_1: (ctx, src, noise, patchyNoise, time) => {
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

  Flaming: (ctx, src, noise, patchyNoise, time, offscreenCtx) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, -8, 128, 128);

    offscreenCtx.clearRect(0, 0, 128, 128);
    offscreenCtx.drawImage(patchyNoise, 0, 128 - time, 128, 128);
    offscreenCtx.drawImage(patchyNoise, 0, 0 - time, 128, 128);

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(offscreenCtx.canvas, 0, 0);

    const gradient = ctx.createLinearGradient(128, 128, 0, 0);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(0.6, 'orange');
    gradient.addColorStop(0.7, 'red');
    gradient.addColorStop(0.9, 'black');

    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0, 128, 128);
  },

  None: (ctx, src) => {
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0, 128, 128);
  }
}


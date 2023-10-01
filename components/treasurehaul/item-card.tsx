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
  const [imgs, setImgs] = useState<{ src?: HTMLImageElement, noise?: HTMLImageElement }>({});

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

    ctx.imageSmoothingEnabled = false;

    let time = 0;
    timerRef.current = setInterval(() => {
      time += 0.7;
      time %= 128;
      Effects[item.effects](ctx, imgs.src!, imgs.noise!, time);
    }, 30);
    
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [canvasRef, imgs, item]);

  const loadImages = async () => {
    const [src, noise] = await Promise.all([
      LoadImage(item.src),
      LoadImage('/noise.png'),
    ]);

    setImgs({
      src,
      noise,
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
    time: number,
  ) => void
} = {
  Enchanted_1: (ctx, src, noise, time) => {
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

  Flaming: (ctx, src, noise, time) => {

  },

  None: (ctx, src) => {
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0, 128, 128);
  }
}


"use client";

import { LoadImage } from "@/lib/canvas-processing";
import { TreasureHaulItem } from "@/lib/treasurehaul/treasure-haul-payload";
import clsx from "clsx";
import { MedievalSharp } from "next/font/google";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = false;

    DrawCardImage(item.src, ctx);
  });

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

async function DrawCardImage(
  src: string,
  ctx: CanvasRenderingContext2D,
) {
  const img = await LoadImage(src);
  ctx.drawImage(img, 0, 0, 128, 128);
}

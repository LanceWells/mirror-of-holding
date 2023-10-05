"use client"

import { TreasureHaulPayload } from "@/lib/treasurehaul/treasure-haul-payload"
import clsx from "clsx";
import ItemCard from "../item-card";
import HaulOpenButton from "./open-button";
import { useDispatch } from "react-redux";
import { setDisplayedItem, setDrawerOpen } from "@/lib/store/chest-haul";

export type HaulContentsProps = {
  haul: TreasureHaulPayload;
}

export default function HaulContents(props: HaulContentsProps) {
  const {
    haul,
  } = props;

  const dispatch = useDispatch();

  const items = Object.entries(haul.haul)
    .map(([key, item], i) => (
      <div data-item-card className={clsx(
        'animate-fold_in',
      )} style={{
        animationDelay: `${i * 750}ms`,
        animationPlayState: 'paused',
        pointerEvents: 'none',
      }}>
        <ItemCard
          item={item}
          itemKey={key}
          onClick={() => {
            dispatch(setDisplayedItem({ item }));
            dispatch(setDrawerOpen('ViewDetails'));
          }}
        />
      </div>
    )
  );

  return (
    <div className={clsx(
      ['flex', 'justify-center', 'items-center'],
    )}>
      <HaulOpenButton imageSrc={haul.previewImageSrc} />
      <div className={clsx(
        ['bg-white', 'dark:bg-slate-900'],
        ['border', 'border-gray-200', 'dark:border-gray-700'],
        ['shadow-md'],
        ['rounded-lg'],
        ['flex', 'items-center', 'justify-center', 'justify-items-center', 'flex-wrap'],
        ['w-[90%]', 'md:w-[80%]'],
        ['h-[90%]', 'md:h-[80%]'],
        ['overflow-y-auto'],
      )}>
        {items}
      </div>
    </div>
  )
}

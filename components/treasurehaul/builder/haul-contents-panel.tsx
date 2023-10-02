"use client";

import { useMemo } from "react";
import { setDisplayedItem, setDrawerOpen, useHaulSelector } from "@/lib/store/treasure-haul";
import ItemCard from "../item-card";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { HaulBuilderDrawerStates } from "@/lib/drawer-states";

export default function ContentsPanel() {
  const haul = useHaulSelector();
  const dispatch = useDispatch();

  const effectsItems = useMemo(
    () => haul
      .flatMap(([itemKey, item]) => (
        <ItemCard
          item={item}
          itemKey={itemKey}
          onClick={(thisItemKey) => {
            dispatch(
              setDisplayedItem({ itemKey: thisItemKey })
            );

            dispatch(
              setDrawerOpen(HaulBuilderDrawerStates[1])
            );
          }}
        />
      )),
    [haul, dispatch]
  )

  return (
    <div className={clsx(
      'absolute',
      'h-full',
      'w-full',
      'justify-center',
      'items-center',
      'flex',
    )}>
      <div className={clsx(
        'bg-white',
        'border-gray-200',
        'dark:bg-slate-900',
        'dark:border-gray-700',
        'border',
        'shadow-md',
        'rounded-lg',
        'flex',
        'items-center',
        'justify-center',
        'justify-items-center',
        'flex-wrap',
        'md:w-[80%]',
        'sm:w-[90%]',
      )}>
        {effectsItems}
      </div>
    </div>
  );
}

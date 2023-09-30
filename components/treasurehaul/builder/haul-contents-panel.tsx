"use client";

import { useMemo } from "react";
import { setDisplayedItem, useHaulSelector } from "@/lib/store/treasure-haul";
import ItemCard from "../item-card";
import clsx from "clsx";
import { useDispatch } from "react-redux";

export default function ContentsPanel() {
  const haul = useHaulSelector();
  const dispatch = useDispatch();

  const effectsItems = useMemo(
    () => haul
    .flatMap(([itemKey, item]) => (
      <ItemCard
        item={item}
        itemKey={itemKey}
        onClick={(thisItemKey) => dispatch(setDisplayedItem({ itemKey: thisItemKey }))}
      />
    )),
    [haul, dispatch]
  )

  return (
    <div className={clsx(
      '[grid-area:contents]',
      'from-slate-300',
      'to-slate-600',
      'bg-gradient-to-br',
      'rounded-xl',
      'border-slate-500',
      'border-4',
      'overflow-y-scroll',
      'mt-2',
      'mr-2',
    )}>
      <div className={clsx(
        'flex',
        'flex-row',
        'flex-wrap',
        'flex-grow-0',
        'items-start',
        'justify-start',
        'content-start',
        'p-2',
      )}>
        {effectsItems}
      </div>
    </div>
  );
}

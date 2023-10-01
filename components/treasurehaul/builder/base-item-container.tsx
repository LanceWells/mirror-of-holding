"use client";

import { addItemToHaul, useSearchTermSelector } from "@/lib/store/treasure-haul";
import { TreasureHaulItemFromBase } from "@/lib/treasurehaul/treasure-haul-payload";
import { BaseItem } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

type BaseItemProps = {
  item: BaseItem;
};

export default function BaseItemContainer(props: BaseItemProps) {
  const {
    item,
  } = props;

  const searchTerm = useSearchTermSelector();

  const dispatch = useDispatch();

  const onClickCB = useCallback(() => {
    dispatch(addItemToHaul({
      item: TreasureHaulItemFromBase(item),
    }))
  }, [dispatch]);

  return (
    <button
      className={clsx(
        'bg-slate-400',
        'hover:bg-slate-300',
        'dark:bg-slate-700',
        'hover:dark:bg-slate-600',
        'transition-colors',
        'p-2',
        'm-2',
        'rounded-md',
        'drop-shadow-sm',
        item.name.toUpperCase().includes(searchTerm)
          ? ['visible']
          : ['hidden']
      )}
      onClick={() => onClickCB()}>
      <Image
        width={64}
        height={64}
        src={item.src}
        alt={item.name}
        priority={false}
      />
    </button>
  );
}

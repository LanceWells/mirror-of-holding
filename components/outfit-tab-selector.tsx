"use client";

import { updateTab, useOutfitTabSelector } from "@/lib/store/character-body";
import {
  OutfitType,
} from "@prisma/client";
import clsx from "clsx";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export type OutfitTabSelectorProps = {
  outfitType: OutfitType;
}

export default function OutfitTabSelector(props: OutfitTabSelectorProps) {
  const {
    outfitType,
  } = props;

  const selectedOutfitType = useOutfitTabSelector();

  const dispatch = useDispatch();
  const handleClick = useCallback(() => 
    dispatch(updateTab(outfitType)),
    [dispatch],
  );

  return (
    <button
      className={clsx(
        'px-6 py-2',
        'rounded-t-md',
        selectedOutfitType === outfitType && [
          'border-b-2',
          'text-indigo-800',
          'bg-slate-200',
          'border-b-indigo-800',
          'dark:text-indigo-100',
          'dark:bg-slate-800',
          'dark:border-b-indigo-100',
        ],
        selectedOutfitType !== outfitType && [
          'my-2',
        ],
        'hover:text-indigo-700',
        'hover:dark:text-indigo-200',
        'hover:bg-slate-100',
        'hover:dark:bg-slate-700',
      )}
      onClick={handleClick}
    >
      {outfitType}
    </button>
  );
}

"use client";

import { useCharacterContext, useCharacterDispatchContext } from "@/lib/character-selection-context";
import { PartType } from "@prisma/client";
import clsx from "clsx";

export type PartTabSelectorProps = {
  partType: PartType;
}

export default function PartTabSelector(props: PartTabSelectorProps) {
  const {
    partType,
  } = props;

  const dispatch = useCharacterDispatchContext();
  const character = useCharacterContext();

  const handleClick = () => {
    if (character.VisibleTab !== partType) {
      dispatch({ type: 'updatePartTab', tab: partType });
    }
  }

  return (
    <button
      className={clsx(
        'px-6 py-2',
        'rounded-t-md',
        character.VisibleTab === partType && [
          'border-b-2',
          'text-indigo-800',
          'bg-slate-200',
          'border-b-indigo-800',
          'dark:text-indigo-100',
          'dark:bg-slate-800',
          'dark:border-b-indigo-100',
        ],
        'hover:text-indigo-700',
        'hover:dark:text-indigo-200',
        'hover:bg-slate-100',
        'hover:dark:bg-slate-700',
      )}
      onClick={handleClick}
    >
      {partType}
    </button>
  );
}

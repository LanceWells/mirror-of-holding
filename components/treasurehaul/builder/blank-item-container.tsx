"use client";

import { addItemToHaul, setEditorDrawerOpen } from "@/lib/store/treasure-haul";
import { TreasureHaulItemFromBlank } from "@/lib/treasurehaul/treasure-haul-payload";
import clsx from "clsx";
import { Tooltip } from "flowbite-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function BlankItemContainer() {
  const dispatch = useDispatch();

  const onClickCB = useCallback(() => {
    dispatch(addItemToHaul({
      item: TreasureHaulItemFromBlank(),
    }));

    dispatch(setEditorDrawerOpen('details'));
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center w-[96px] h-[96px]">
      <button
        className={clsx(
          'bg-teal-700',
          'hover:bg-slate-300',
          'dark:bg-teal-800',
          'hover:dark:bg-slate-600',
          'transition-colors',
          'p-2',
          'm-2',
          'rounded-full',
          'drop-shadow-sm',
        )}
        onClick={() => onClickCB()}>
        <Tooltip content="New blank item">
          <svg className="w-[30px] h-[30px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </Tooltip>
      </button>
    </div>
  );
}

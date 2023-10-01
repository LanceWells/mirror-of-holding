"use client"

import { setEditorDrawerOpen } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch } from "react-redux";

export default function BuilderToolbar() {
  const dispatch = useDispatch();

  return (
    <div className={clsx(
      'md:h-72',
      'md:-translate-y-1/2',
      'md:top-1/2',
      'md:left-12',
      'md:w-16',
      'bottom-4',
      'left-1/2',
      'w-[90%]',
      '-translate-x-1/2',
      'fixed',
      'z-30',
      'rounded-full',
      'bg-white',
      'border',
      'border-gray-200',
      'grid',
      'justify-center',
      'items-center',
      'shadow-md',
    )}>
      <Tooltip content="Add item">
        <Button
          onClick={() => dispatch(setEditorDrawerOpen('baseItem'))}
          className={clsx(
            'rounded-full',
            'z-10',
            'w-10',
            'h-10',
          )}
        >
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </Button>
      </Tooltip>
    </div>
  )
}

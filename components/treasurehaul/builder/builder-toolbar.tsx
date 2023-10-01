"use client"

import { setEditorDrawerOpen } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch } from "react-redux";

export default function BuilderToolbar() {
  const dispatch = useDispatch();

  return (
    <div className={clsx(
      'fixed',
      'z-30',
      'h-72',
      '-translate-y-1/2',
      'w-16',
      'max-w-lg',
      'rounded-full',
      'top-1/2',
      'left-4',
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

"use client"

import clsx from "clsx";
import { Button, Tooltip } from "flowbite-react";

export default function BuilderToolbar() {
  return (
    <div className={clsx(
      'fixed',
      'z-30',
      'w-full',
      'h-16',
      'max-w-lg',
      '-translate-x-1/2',
      'rounded-full',
      'bottom-4',
      'left-1/2',
      'bg-white',
      'border',
      'border-gray-200',
      'grid',
      'justify-center',
      'items-center'
    )}>
      <Tooltip content="Add item">
        <Button className={clsx(
          'rounded-full',
          'z-10',
          'w-10',
          'h-10',
        )}>
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </Button>
      </Tooltip>
    </div>
  )
}
"use client"

import { HaulBuilderDrawerStates } from "@/lib/drawer-states";
import { setDrawerOpen, useHaulSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { Button, Tooltip } from "flowbite-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function BuilderToolbar() {
  const haul = useHaulSelector();
  const dispatch = useDispatch();

  const handleCreate = useCallback(() => {
    fetch(
      '/api/treasurehaul/builder', {
      body: JSON.stringify({
        roomName: "Testing",
        haul: haul.map(([_, item]) => item),
      }),
      method: 'POST',
    }
    );
  }, [haul])

  return (
    <div className={clsx(
      ['bg-white', 'border-gray-200'],
      ['dark:bg-slate-600', 'dark:border-gray-600'],
      ['w-[90%]', 'md:h-72', 'md:w-12'],
      ['-translate-x-1/2', 'md:-translate-y-1/2',],
      ['z-30'],
      ['left-1/2', 'bottom-4', 'md:top-1/2', 'md:left-12'],
      ['fixed'],
      ['rounded-full'],
      ['border'],
      [
        'grid',
        'grid-flow-col', 'md:grid-flow-row',
        'justify-center', 'items-center', 'justify-items-center'
      ],
      ['shadow-md'],
    )}>
      <Tooltip content="Create haul">
        <button onClick={handleCreate} className={clsx(
          ['rounded-full'],
          ['w-12', 'h-12'],
          ['p-0'],
          ['flex', 'place-content-center', 'items-center'],
        )}>
          <Image
            src='/scroll-quill.svg'
            alt='create chest'
            width={32}
            height={32}
          />
        </button>
      </Tooltip>
      <Tooltip content="Add item">
        <button
          onClick={() => dispatch(setDrawerOpen(HaulBuilderDrawerStates[0]))}
          className={clsx(
            ['rounded-full'],
            ['w-14', 'h-14'],
            ['p-0'],
            ['bg-cyan-600'],
          )}
        >
          <Image
            src='/add-plus.svg'
            alt='Add'
            width={64}
            height={64}
          />
        </button>
      </Tooltip>
    </div>
  )
}

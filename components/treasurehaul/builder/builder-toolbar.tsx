"use client"

import { setEditorDrawerOpen, useHaulSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { Button, Tooltip } from "flowbite-react";
import { useDispatch } from "react-redux";

export default function BuilderToolbar() {
  const dispatch = useDispatch();
  const haul = useHaulSelector();

  return (
    <div className={clsx(
      'bg-white',
      'border-gray-200',
      'dark:bg-slate-600',
      'dark:border-gray-600',
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
      'border',
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
      <Tooltip content="Create haul">
        <Button
          onClick={
            () => fetch(
              '/api/treasurehaul/builder', {
                body: JSON.stringify({
                  roomName: "Testing",
                  haul: haul.map(([_, item]) => item),
                }),
                method: 'POST',
              }
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
              <path d="M496.938 14.063c-95.14 3.496-172.297 24.08-231.282 55.812l-29.47 49.28-4.967-28.093c-10.535 7.402-20.314 15.222-29.314 23.407l-14.687 45.06-5.032-25.155c-40.65 45.507-60.41 99.864-58.938 155.906 47.273-93.667 132.404-172.727 211.97-221.155l9.717 15.97c-75.312 45.838-156.387 121.202-202.187 208.25h12.156c19.78-12.02 39.16-26.858 58.406-43.44l-30.28 1.595 54.218-23.094c46.875-43.637 93.465-94.974 143.313-138.28l-24.47-5.19 56.5-21.03c26.853-20.485 54.8-37.844 84.344-49.843zM59.53 312.03v30.408H194V312.03H59.53zm20.376 49.095L47.25 389.813 24.97 474.78l14.53 15.876h177.22l14.56-15.875L209 389.814l-30.906-28.688H79.906z" fill="#fff" fill-opacity="1">
              </path>
          </svg>
        </Button>
      </Tooltip>
    </div>
  )
}

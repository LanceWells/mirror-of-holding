"use client";

import { setEditorDrawerOpen, useDrawerOpenSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import Image from "next/image";
import BuilderSearch from "./builder-search";
import { ReactNode } from "react";

type BuilderDrawerProps = {
  itemSelector: ReactNode
}

export default function BuilderDrawer(props: BuilderDrawerProps) {
  // add item opens drawer.
  // prefill with blank details
  // add button to use predefined item details

  const {
    itemSelector,
  } = props;

  const drawerOpen = useDrawerOpenSelector();
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        'fixed',
        'w-screen',
        'h-screen',
        'left-0',
        'top-0',
        'z-40',
        'grid',
        'grid-cols-[min-content_1fr]',
        'pointer-events-none'
      )}>
      <div
        className={clsx(
          'relative',
          'top-0',
          'left-0',
          'z-50',
          'h-screen',
          'p-4',
          'overflow-y-auto',
          'transition-transform',
          'bg-white',
          'w-80',
          'dark:bg-gray-800',
          'pointer-events-auto',
          drawerOpen
            ? ['']
            : ['-translate-x-full'],
        )}
      >
        <h5>Testing</h5>
        <Image src='/magnifying-glass.svg' alt='search' width={32} height={32} />
        <BuilderSearch />
        {itemSelector}
        <form>
        </form>
      </div>
      <div
        onClick={() => { dispatch(setEditorDrawerOpen(false)) }}
        className={clsx(
          'relative',
          drawerOpen
            ? ['pointer-events-auto']
            : ['pointer-events-none']
        )} />
      <div className={clsx(
        'fixed',
        'w-full',
        'h-full',
        'bg-black/40',
        'transition-opacity',
        'pointer-events-none',
        drawerOpen
          ? ['opacity-100']
          : ['opacity-0']
      )} />
    </div>
  );
}
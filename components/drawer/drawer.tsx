"use client";

import { setDrawerOpen as setDrawerOpen, useDrawerOpenSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

type DrawerProps<T extends string> = {
  drawerStates: {
    [P in T]: ReactNode
  };
}

export default function Drawer<T extends string>(props: DrawerProps<T>) {
  const {
    drawerStates,
  } = props;

  const dispatch = useDispatch();
  const drawerOpen = useDrawerOpenSelector() as keyof typeof drawerStates | null;
  const drawerChild = drawerOpen ? drawerStates[drawerOpen] : (<></>);

  return (
    <div className={clsx(
      ['fixed'],
      ['left-0', 'top-0'],
      ['z-40'],
      ['w-screen', 'h-screen'],
      ['grid', 'grid-cols-[min-content_1fr]'],
      ['pointer-events-none'],
    )}>
      <div className={clsx(
        ['bg-gray-100', 'dark:bg-gray-800'],
        ['relative'],
        ['top-0', 'left-0'],
        ['z-50'],
        ['h-full', 'w-96'],
        ['p-4'],
        ['overflow-y-auto', 'overflow-x-hidden'],
        ['pointer-events-auto'],
        ['transition-transform'],
        drawerOpen ? '' : '-translate-x-full',
      )}>
        {drawerChild}
      </div>
      <div
        onClick={() => { dispatch(setDrawerOpen(null)) }}
        className={clsx(
          ['relative'],
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )} />
      <div className={clsx(
        ['bg-black/40'],
        ['fixed'],
        ['w-full', 'h-full'],
        ['transition-opacity'],
        ['pointer-events-none'],
        drawerOpen ? 'opacity-100' : 'opacity-0',
      )} />
    </div>
  )
}

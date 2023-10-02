"use client";

import { setEditorDrawerOpen, useDrawerOpenSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import Image from "next/image";
import BuilderSearch from "./builder-search";
import { ReactNode, useMemo } from "react";
import { Button } from "flowbite-react";
import ItemDetailsPane from "./item-details-pane";

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
          'w-96',
          'h-full',
          'pointer-events-auto',
          'overflow-x-hidden',
          'bg-gray-100',
          'dark:bg-gray-800',
          drawerOpen
            ? ['']
            : ['-translate-x-full'],
        )}
      >
        <div className={clsx(
          'h-full',
          drawerOpen === 'baseItem'
            ? ['visible']
            : ['hidden']
        )}>
          <BaseItemSetup itemSelector={itemSelector} />
        </div>
        <div className={clsx(
          'h-full',
          drawerOpen === 'details'
            ? ['visible']
            : ['hidden']
        )}>
          <ItemDetailsPane />
        </div>
      </div>
      <div
        onClick={() => { dispatch(setEditorDrawerOpen(null)) }}
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

function BaseItemSetup(props: { itemSelector: ReactNode }) {
  return (
    <div className={clsx(
        'grid',
        'grid-cols-[32px_1fr]',
        'grid-rows-[auto_auto_auto_1fr]',
        'gap-y-2',
        'gap-x-1',
        'h-full',
      )}
      style={{
        gridTemplateAreas: `
          "title        title"
          "hr           hr"
          "search-icon  search-box"
          "options      options"
        `
      }}
    >
      <h2 className="[grid-area:title] text-xl">
        Add an Item
      </h2>
      <hr className="[grid-area:hr] w-full mb-8" />
      <Image
        src='/magnifying-glass.svg'
        alt='search'
        width={32}
        height={32}
        className="[grid-area:search-icon] translate-y-1"
      />
      <div className="[grid-area:search-box]">
        <BuilderSearch />
      </div>
      <div className="[grid-area:options] grid">
        {props.itemSelector}
      </div>
    </div>
  )
}

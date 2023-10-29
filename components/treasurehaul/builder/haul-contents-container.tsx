'use client';

import { useHaulSelector, setDisplayedItem, setDrawerOpen } from '@/lib/store/treasure-haul';
import clsx from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ItemCard from '../item-card';
import { HaulContents } from '@/components/haulContents/haul-contents';
import PixiCardGrid from '@/components/pixi/card-grid/card-grid';

export default function HaulContentsContainer() {
  const haul = useHaulSelector();
  const dispatch = useDispatch();

  const haulContentsRef = useRef<HTMLDivElement | null>(null);

  const effectsItems = useMemo(
    () => Object.entries(haul)
      .flatMap(([itemKey, item]) => (
        <ItemCard
          item={item}
          itemKey={itemKey}
          key={itemKey}
          onClick={(thisItemKey) => {
            dispatch(
              setDisplayedItem({ itemKey: thisItemKey })
            );

            dispatch(
              setDrawerOpen('EditDetails')
            );
          }}
        />
      )),
    [haul, dispatch]
  );

  return (
    <>
      <HaulContents ref={haulContentsRef}>
        <div
          className={clsx(
            'z-20',
            'text-center text-lg',
            'dark:text-white',
            effectsItems.length > 0
              ? 'hidden'
              : 'visible'
          )}>
          <p>Nothing here yet!</p>
          <p>Click the <b>plus sign</b> in the toolbar to get started 🙂</p>
        </div>
        {effectsItems}
        <PixiCardGrid resizeTo={haulContentsRef} />
      </HaulContents>
    </>
  );
}

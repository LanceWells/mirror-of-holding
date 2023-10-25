'use client';

import { AddIcon, LoadingIcon, ScrollQuillIcon, TreasureChestOpenIcon } from '@/components/svgs';
import { setDrawerOpen, setToast, useChestDetailsSelector, useHaulSelector } from '@/lib/store/treasure-haul';
import { TreasureHaulPayload } from '@/lib/treasurehaul/treasure-haul-payload';
import clsx from 'clsx';
import { Tooltip } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function BuilderToolbar() {
  const haul = useHaulSelector();
  const chestDetails = useChestDetailsSelector();
  const dispatch = useDispatch();

  const [isCreatingChest, setIsCreatingChest] = useState(false);

  const handleCreate = useCallback(async () => {
    const payload: TreasureHaulPayload = {
      haul,
      previewImageSrc: chestDetails.chestIconURL,
      roomName: chestDetails.chestName,
    };

    setIsCreatingChest(true);

    const resp = await fetch(
      '/api/treasurehaul/builder',
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    );

    const { roomID } = await resp.json() as { roomID: number };
    setIsCreatingChest(false);
    dispatch(setToast({
      text: 'Successfully created a chest!',
      duration: null,
      icon: 'success',
      url: `${window.location.protocol}//${window.location.host}/treasurehaul/${roomID}`
    }));
  }, [haul, chestDetails, dispatch]);

  return (
    <div className={clsx(
      ['bg-white', 'border-gray-200'],
      ['dark:bg-slate-600', 'dark:border-gray-600'],
      ['w-[90%]', 'md:h-72', 'md:w-16'],
      ['-translate-x-1/2', 'md:-translate-y-1/2',],
      ['z-20'],
      ['left-1/2', 'bottom-4', 'md:top-1/2', 'md:left-12'],
      ['fixed'],
      ['rounded-full'],
      ['border'],
      [
        'grid',
        'grid-flow-col', 'md:grid-flow-row',
        'md:justify-center', 'items-center', 'justify-items-center'
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
          <TreasureChestOpenIcon className={clsx(
            ['fill-gray-900', 'dark:fill-gray-50'],
            ['w-32', 'h-32'],
            isCreatingChest
              ? 'hidden'
              : 'visible'
          )} />
          <LoadingIcon className={clsx(
            ['fill-gray-900', 'dark:fill-gray-50'],
            ['stroke-gray-900', 'dark:stroke-gray-50'],
            'w-8',
            'h-8',
            ['animate-spin'],
            isCreatingChest
              ? 'visible'
              : 'hidden'
          )} />
        </button>
      </Tooltip>
      <Tooltip content="Add item">
        <button
          onClick={() => dispatch(setDrawerOpen('PickBaseItem'))}
          className={clsx(
            ['rounded-full'],
            ['w-12', 'h-12'],
            ['p-0'],
            ['bg-cyan-600'],
          )}
        >
          <AddIcon className={clsx(
            'stroke-gray-50',
            'w-12',
            'h-12',
          )} />
        </button>
      </Tooltip>
      <Tooltip content="Edit chest details">
        <button
          onClick={() => dispatch(setDrawerOpen('EditChestDetails'))}
          className={clsx(
            ['rounded-full'],
            ['w-12', 'h-12'],
            ['p-0'],
            ['flex', 'place-content-center', 'items-center'],
          )}>
          <ScrollQuillIcon className={clsx(
            ['fill-gray-900', 'dark:fill-gray-50'],
            ['w-32', 'h-32'],
          )} />
        </button>
      </Tooltip>
    </div>
  );
}

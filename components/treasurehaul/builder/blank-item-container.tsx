'use client';

import { AddIcon } from '@/components/svgs';
import { addItemToHaul, setDrawerOpen } from '@/lib/store/treasure-haul';
import { TreasureHaulItemFromBlank } from '@/lib/treasurehaul/treasure-haul-payload';
import clsx from 'clsx';
import { Tooltip } from 'flowbite-react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function BlankItemContainer() {
  const dispatch = useDispatch();

  const onClickCB = useCallback(() => {
    dispatch(addItemToHaul({
      item: TreasureHaulItemFromBlank(),
    }));

    dispatch(setDrawerOpen('EditDetails'));
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center w-[96px] h-[96px]">
      <Tooltip content="New blank item">
        <button
          className={clsx(
            'bg-teal-600',
            'hover:bg-slate-300',
            'dark:bg-teal-800',
            'hover:dark:bg-slate-600',
            'transition-colors',
            'p-2',
            'm-2',
            'rounded-full',
            'drop-shadow-sm',
          )}
          onClick={() => onClickCB()}>
          <AddIcon className='stroke-gray-50 w-12 h-12' />
        </button>
      </Tooltip>
    </div>
  );
}

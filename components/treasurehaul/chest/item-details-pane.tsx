'use client';

import { useDisplayedItemSelector } from '@/lib/store/chest-haul';
import { TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import clsx from 'clsx';
import ItemCard from '../item-card';

export default function ChestItemDetailsPane() {
  const displayedItem = useDisplayedItemSelector();

  return (
    <div className="h-full">
      {
        displayedItem && (
          <ItemDetailsContents item={displayedItem} />
        )
      }
    </div>
  );
}

type ItemDetailsContentsProps = {
  item: TreasureHaulItem;
}

function ItemDetailsContents(props: ItemDetailsContentsProps) {
  const {
    item
  } = props;

  const description = item.description
    ? item.description
    : `A plain ${item.itemName}`;

  return (
    <div className={clsx(
      ['grid', 'content-center', 'grid-rows-[min-content_min-content], gap-y-8'],
      ['h-full'],
    )}>
      <div className="justify-self-center">
        <ItemCard
          item={item}
          itemKey=""
        />
      </div>
      <p className={clsx(
        ['text-lg', 'text-black', 'dark:text-gray-50'],
        ['bg-slate-100', 'dark:bg-slate-700'],
        ['rounded-lg'],
        ['p-4'],
      )}>
        {description}
      </p>
    </div>
  );
}

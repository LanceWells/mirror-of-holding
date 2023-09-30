"use client";

import { useDisplayedItemSelector } from "@/lib/store/treasure-haul";
import ItemCard from "../item-card";
import clsx from "clsx";
import { TextInput } from "@/components/form/form-helpers";
import { TreasureHaulItem } from "@/lib/treasurehaul/treasure-haul-payload";

export default function ItemDetailsPane() {
  const displayedItem = useDisplayedItemSelector();

  return (
    <div className={clsx(
      'rounded-xl',
      'from-slate-300',
      'to-slate-600',
      'bg-gradient-to-br',
      'border-4',
      'border-slate-500',
      'mb-2',
      'mr-2',
    )}>
      {displayedItem && (
        <ItemDetailsContents
          item={displayedItem.item}
          key={displayedItem.itemKey}
        />
      )}
    </div>
  )
}

type ItemDetailsContentsProps = {
  item: TreasureHaulItem;
  key: string;
}

function ItemDetailsContents(props: ItemDetailsContentsProps) {
  const {
    item,
    key,
  } = props;

  return (
    <div className={clsx(
      'grid',
      'grid-cols-[min-content_1fr]',
      'gap-x-8',
    )}>
      <ItemCard
        item={item}
        itemKey={key}
      />
      <form>
        <TextInput
          fieldDisplayName={"Item Name"}
          defaultValue={item.itemName}
        />
      </form>
    </div>
  )
}

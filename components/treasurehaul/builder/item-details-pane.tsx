"use client";

import { removeItemFromHaul, setEditorDrawerOpen, updateItemInHaul, useDisplayedItemSelector } from "@/lib/store/treasure-haul";
import ItemCard from "../item-card";
import clsx from "clsx";
import { TreasureHaulItem, TreasureHaulItemEffectType } from "@/lib/treasurehaul/treasure-haul-payload";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function ItemDetailsPane() {
  const displayedItem = useDisplayedItemSelector();

  return (
    <div className="h-full">
      {displayedItem && (
        <ItemDetailsContents
          item={displayedItem.item}
          itemKey={displayedItem.itemKey}
        />
      )}
    </div>
  )
}

type ItemDetailsContentsProps = {
  item: TreasureHaulItem;
  itemKey: string;
}

function ItemDetailsContents(props: ItemDetailsContentsProps) {
  const {
    item,
    itemKey,
  } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<TreasureHaulItem>(structuredClone(item));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFormData(structuredClone(item));
  }, [item, itemKey]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateItemInHaul({
      item: formData,
      key: itemKey,
    }));

    dispatch(setEditorDrawerOpen(null));
  }

  const handleClickDelete = useCallback(() => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      timeoutRef.current = setTimeout(() => setConfirmDelete(false), 3000);
    } else {
      dispatch(
        removeItemFromHaul({ key: itemKey })
      );

      dispatch(
        setEditorDrawerOpen(null)
      );
    }
  }, [confirmDelete])

  const effectOptions = useMemo(
    () => Object.keys(TreasureHaulItemEffectType)
      .map((effect) => (<option>{effect}</option>)),
    [],
  );

  return (
    <div className={clsx(
      'grid',
      'h-full',
      'items-end',
      'grid-rows-[min-content_min-content_1fr]'
    )}>
      <div className="flex justify-center">
        <ItemCard
          item={formData}
          itemKey={itemKey}
        />
      </div>
      <form
        className={clsx(
          'grid',
          'grid-cols-1',
          'gap-y-4',
        )}
        onSubmit={handleSubmit}
      >
        <div>
          <Label
            htmlFor="item-name"
            value="Name"
          />
          <TextInput
            id="item-name"
            value={formData.itemName}
            type="text"
            required
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
          />
        </div>
        <div>
          <Label
            htmlFor="item-description"
            value="Description"
          />
          <Textarea
            id="item-description"
            value={formData.description}
            rows={4}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <Label
            htmlFor="item-src"
            value="Image URL"
          />
          <TextInput
            id="item-src"
            value={formData.src}
            type="text"
            required
            onChange={(e) => setFormData({ ...formData, src: e.target.value })}
          />
        </div>
        <div>
          <Label
            htmlFor="effect-options"
            value="Effects"
          />
          <Select
            id="effect-options"
            value={formData.effects}
            onChange={(e) => setFormData({ ...formData, effects: e.target.value as TreasureHaulItemEffectType })}
          >
            {effectOptions}
          </Select>
        </div>
        <Button type="submit">
          Update Item
        </Button>
      </form>
      <Button onClick={handleClickDelete} color='failure' className={clsx(
        confirmDelete && ['animate-pulse'],
        'transition-all',
      )}>
        {
          confirmDelete ? 'Are you sure?' : 'Delete this item'
        }
      </Button>
    </div>
  )
}

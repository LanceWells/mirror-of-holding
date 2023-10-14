"use client";

import { removeItemFromHaul, setDrawerOpen, updateItemInHaul, useDisplayedItemSelector } from "@/lib/store/treasure-haul";
import ItemCard from "../item-card";
import clsx from "clsx";
import { ItemEffectOptions, ItemEffectUniformColor, TreasureHaulItem } from "@/lib/treasurehaul/treasure-haul-payload";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HuePicker, HuePickerProps } from "react-color";
import { produce } from 'immer';

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

    dispatch(setDrawerOpen(null));
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
        setDrawerOpen(null)
      );
    }
  }, [confirmDelete])

  const effectOptions = useMemo(
    () => Object.keys(ItemEffectOptions)
      .map((effect) => (<option>{effect}</option>)),
    []
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
            value={formData.effects.type}
            onChange={(e) => {
              let effects: TreasureHaulItem['effects'] = {
                type: 'none',
              }

              switch (e.target.value as ItemEffectOptions) {
                case 'enchanted':
                  effects = {
                    type: 'enchanted'
                  }
                  break;

                case 'flaming': effects = {
                  type: 'flaming',
                  uniforms: {
                    color: {
                      r: 255,
                      g: 0,
                      b: 0,
                    }
                  }
                }
                  break;

                case 'sparkles': effects = {
                  type: 'sparkles',
                  uniforms: {
                    emitterX: 62,
                    emitterY: 62,
                    emitterRadius: 30,
                    particleFrequency: 5,
                    particleLifetime: 50,
                    particleSpeed: 0,
                  }
                }
                  break;
                
                  case 'particles': effects = {
                    type: 'particles',
                    uniforms: {
                      emitterX: 32,
                      emitterY: 32,
                      emitterRadius: 30,
                      particleFrequency: 10,
                      particleLifetime: 1000,
                      particleSpeed: 0.01,
                    }
                  }
              }

              setFormData({
                ...formData,
                effects,
              })
            }}
          >
            {effectOptions}
          </Select>
        </div>
        <UniformFields
          colorSettings={{
            color: (formData.effects as any)['color'],
            onChangeColor: (color) => {
              const updatedColor = produce(formData, (draft) => {
                draft.effects.uniforms = {
                  color: color.rgb,
                }
              })
              setFormData(updatedColor);
            },
          }}
          effects={formData.effects}
        />
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

type UniformFieldsProps = {
  effects: TreasureHaulItem['effects'];
  colorSettings: ItemEffectUniformColor & {
    onChangeColor: HuePickerProps['onChange'];
  }
}

function UniformFields(props: UniformFieldsProps) {
  const {
    effects,
    colorSettings,
  } = props;

  const colorPicker = useMemo(() =>
    effects.type === 'flaming'
      ? (
        <div className='grid'>
          <Label value="Effect Color" />
          <HuePicker
            className="justify-self-center"
            color={effects.uniforms.color}
            onChange={colorSettings.onChangeColor}
          />
        </div>
      )
      : (<></>)
    , [effects]);

  return (
    <div>
      {colorPicker}
    </div>
  )
}

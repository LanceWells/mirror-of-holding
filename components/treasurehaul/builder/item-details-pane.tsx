'use client';

import { removeItemFromHaul, setDrawerOpen, updateItemInHaul, useDisplayedItemSelector } from '@/lib/store/treasure-haul';
import ItemCard from '../item-card';
import clsx from 'clsx';
import { ItemEffectOptions, ItemEffectUniformColor, ItemEffectUniformParticles, TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import { Button, Label, RangeSlider, Select, TextInput, Textarea } from 'flowbite-react';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AlphaPicker, HuePicker, HuePickerProps } from 'react-color';
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
  );
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
  };

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
  }, [confirmDelete, dispatch, itemKey]);

  const effectOptions = useMemo(
    () => Object.keys(ItemEffectOptions)
      .map((effect) => (<option key={effect}>{effect}</option>)),
    []
  );

  return (
    <div className={clsx(
      'grid',
      'h-full',
      'items-end',
      'grid-rows-[min-content_min-content_1fr]',
    )}>
      <div className={clsx(
        ['sticky', 'top-0', 'z-10'],
        ['justify-self-center', 'w-full'],
        ['flex', 'justify-center'],
        ['bg-gray-100', 'dark:bg-gray-800', 'shadow-md'],
      )}>
        {/* <div className="sticky top-0 z-10 justify-self-center w-full flex justify-center bg-current box-border"> */}
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
          'p-4',
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
              };

              switch (e.target.value as ItemEffectOptions) {
                case 'enchanted':
                  effects = {
                    type: 'enchanted'
                  };
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
                };
                  break;

                case 'particles': effects = {
                  type: 'particles',
                  uniforms: {
                    emitterX: 32,
                    emitterY: 32,
                    emitterRadius: 30,
                    emitterCone: 360,
                    emitterDirection: 45,
                    particleFrequency: 50,
                    particleLifetime: 100,
                    particleSpeed: 0.05,
                    attractorStrength: 0,
                    attractorX: 0,
                    attractorY: 0,
                    startSize: 1,
                    endSize: 1,
                    startColor: { r: 255, g: 255, b: 0, a: 1.0 },
                    endColor: { r: 255, g: 255, b: 0, a: 1.0 },
                  }
                };
              }

              setFormData({
                ...formData,
                effects,
              });
            }}
          >
            {effectOptions}
          </Select>
        </div>
        <UniformFields
          colorSettings={{
            onChangeColor: (color) => {
              const updatedColor = produce(formData, (draft) => {
                draft.effects.uniforms = {
                  color: color.rgb,
                };
              });
              setFormData(updatedColor);
            },
          }}
          particleSettings={{
            onChangeParticle: (newParticleSettings) => {
              const updatedSettings = produce(formData, (draft) => {
                draft.effects.uniforms = newParticleSettings;
              });
              setFormData(updatedSettings);
            }
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
  );
}

type UniformFieldsProps = {
  effects: TreasureHaulItem['effects'];
  colorSettings: {
    onChangeColor: HuePickerProps['onChange'];
  },
  particleSettings: {
    onChangeParticle: (newSettings: ItemEffectUniformParticles) => void;
  }
}

function UniformFields(props: UniformFieldsProps) {
  const {
    effects,
    colorSettings,
    particleSettings,
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
    , [effects, colorSettings.onChangeColor]);

  const particleOptions = useMemo(() =>
    effects.type === 'particles'
      ? (
        <div className='grid gap-y-6'>
          <div className='flex flex-col border border-gray-400 px-5 py-2 rounded-md gap-y-2'>
            <Label value='Emitter' className='absolute -translate-y-6 bg-gray-100 dark:bg-gray-800 p-1' />
            <div>
              <Label value='Emitter X' />
              <RangeSlider
                max={128}
                min={0}
                value={effects.uniforms.emitterX}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  emitterX: Number.parseInt(e.target.value),
                })}
              />
            </div>
            <div>
              <Label value='Emitter Y' />
              <RangeSlider
                max={128}
                min={0}
                value={effects.uniforms.emitterY}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  emitterY: Number.parseInt(e.target.value),
                })}
              />
            </div>
            <div>
              <Label value='Emitter Radius' />
              <RangeSlider
                max={64}
                min={0}
                value={effects.uniforms.emitterRadius}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  emitterRadius: Number.parseInt(e.target.value),
                })}
              />
            </div>
            <div>
              <Label value='Emitter Cone' />
              <RangeSlider
                max={360}
                min={0}
                value={effects.uniforms.emitterCone}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  emitterCone: Number.parseInt(e.target.value),
                })}
              />
            </div>
            <div>
              <Label value='Emitter Direction' />
              <RangeSlider
                max={360}
                min={1}
                value={effects.uniforms.emitterDirection}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  emitterDirection: Number.parseInt(e.target.value),
                })}
              />
            </div>
          </div>
          <div className='flex flex-col border border-gray-400 px-5 py-2 rounded-md gap-y-2'>
            <Label value='Particle' className='absolute -translate-y-6 bg-gray-100 dark:bg-gray-800 p-1' />
            <div>
              <Label value='Particle Frequency' />
              <RangeSlider
                max={300}
                min={1}
                value={effects.uniforms.particleFrequency * 10}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  particleFrequency: Number.parseInt(e.target.value) / 10,
                })}
              />
            </div>
            <div>
              <Label value='Particle Lifetime' />
              <RangeSlider
                max={1000}
                min={1}
                value={effects.uniforms.particleLifetime}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  particleLifetime: Number.parseInt(e.target.value),
                })}
              />
            </div>
            <div>
              <Label value='Particle Speed' />
              <RangeSlider
                max={100}
                min={0}
                value={effects.uniforms.particleSpeed * 1000}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  particleSpeed: Number.parseInt(e.target.value) / 1000,
                })}
              />
            </div>
          </div>
          <div className='flex flex-col border border-gray-400 px-5 py-2 rounded-md gap-y-2'>
            <Label value='Lifetime' className='absolute -translate-y-6 bg-gray-100 dark:bg-gray-800 p-1' />
            <div>
              <Label value='Start Size' />
              <RangeSlider
                max={100}
                min={0}
                value={effects.uniforms.startSize * 100}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  startSize: Number.parseInt(e.target.value) / 100,
                })}
              />
            </div>
            <div>
              <Label value='End Size' />
              <RangeSlider
                max={100}
                min={0}
                value={effects.uniforms.endSize * 100}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  endSize: Number.parseInt(e.target.value) / 100,
                })}
              />
            </div>
            <div className='max-w-full box-border'>
              <Label value='Start Color' />
              <HuePicker
                // HACK: Using the max w constraint. There's probably some box border fix that works.
                className="justify-self-center max-w-[95%]"
                color={effects.uniforms.startColor}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  startColor: {
                    ...e.rgb,
                    a: effects.uniforms.startColor.a,
                  }
                })}
              />
              <AlphaPicker
                className="justify-self-center max-w-[95%]"
                color={effects.uniforms.startColor}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  startColor: {
                    ...effects.uniforms.startColor,
                    a: e.rgb.a ?? 1.0,
                  }
                })}
              />
            </div>
            <div className='max-w-full box-border'>
              <Label value='End Color' />
              <HuePicker
                // HACK: Using the max w constraint. There's probably some box border fix that works.
                className="justify-self-center max-w-[95%]"
                color={effects.uniforms.endColor}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  endColor: {
                    ...e.rgb,
                    a: effects.uniforms.endColor.a,
                  }
                })}
              />
              <AlphaPicker
                className="justify-self-center max-w-[95%]"
                color={effects.uniforms.endColor}
                onChange={(e) => particleSettings.onChangeParticle({
                  ...effects.uniforms,
                  endColor: {
                    ...effects.uniforms.endColor,
                    a: e.rgb.a ?? 1.0,
                  }
                })}
              />
            </div>
          </div>
        </div>
      )
      : (<></>)
    , [effects, particleSettings]);

  return (
    <div>
      {colorPicker}
      {particleOptions}
    </div>
  );
}

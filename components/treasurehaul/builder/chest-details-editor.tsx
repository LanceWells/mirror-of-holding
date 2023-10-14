'use client';

import { ChestIconOptions } from '@/components/chestDetails/chest-details-options';
import Spinner from '@/components/spinner/spinner';
import { setChestDetails, setDrawerOpen, useChestDetailsSelector } from '@/lib/store/treasure-haul';
import clsx from 'clsx';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const imageLoadDelay = 2000;

export default function ChestDetailsEditor() {
  const chestDetails = useChestDetailsSelector();
  const dispatch = useDispatch();

  const chestOptions = [
    ...Object.entries(ChestIconOptions),
  ].map((option) => (
    <option key={option[0]}>
      {option[0]}
    </option>
  ));

  const [formData, setFormData] = useState({
    chestName: chestDetails.chestName,
    chestIconOption: chestDetails.chestIconOption,
    chestIconURL: chestDetails.chestIconURL,
  });

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [debouncedURL, setDeboucedURL] = useState(chestDetails.chestIconURL);
  const imgTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (imgTimerRef.current) {
      clearTimeout(imgTimerRef.current);
    }

    setIsLoadingImage(true);
    imgTimerRef.current = setTimeout(() => {
      setIsLoadingImage(false);
      setDeboucedURL(formData.chestIconURL);
    }, imageLoadDelay);
  }, [formData.chestIconURL]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setChestDetails({
      chestIconOption: formData.chestIconOption,
      chestIconURL: debouncedURL,
      chestName: formData.chestName,
    }));

    dispatch(setDrawerOpen(null));
  };

  return (
    <div className={clsx(
      [
        'grid', 'align-items-start', 'content-start',
        'grid-rows-[min-content_min-content_1fr]',
        'gap-y-4',
      ],
      ['h-full'],
    )}>
      <h2 className={clsx(
        ['text-xl'],
        ['text-black', 'dark:text-slate-50'],
      )}>
        Chest Details
      </h2>
      <hr />
      <form
        onSubmit={handleSubmit}
        className={clsx(
          [
            'grid', 'grid-cols-1', 'gap-y-4', 'content-start',
            'grid-rows-[min-content_min-content_min-content_1fr]',
          ],
        )}>
        <div>
          <Label value="Chest Name" />
          <TextInput
            onChange={(e) => setFormData({
              ...formData,
              chestName: e.target.value,
            })}
            value={formData.chestName}
          />
        </div>
        <div>
          <Label value="Chest Icon Options" />
          <Select
            onChange={(e) => {
              setFormData({
                ...formData,
                chestIconURL: ChestIconOptions[e.target.value as ChestIconOptions],
                chestIconOption: e.target.value as ChestIconOptions,
              });
            }}
            value={formData.chestIconOption}
          >
            {chestOptions}
          </Select>
        </div>
        <div className={clsx(
          formData.chestIconOption === 'custom'
            ? 'visible'
            : 'hidden'
        )}>
          <Label value="Custom Icon URL" />
          <TextInput
            onChange={(e) => {
              setFormData({
                ...formData,
                chestIconURL: e.target.value,
              });
            }}
            value={formData.chestIconURL}
          />
        </div>
        <div className={clsx(
          'grid',
        )}>
          <Label value="Current Icon Preview" />
          <img
            className={clsx(
              'justify-self-center',
              isLoadingImage
                ? 'hidden'
                : 'visible'
            )}
            alt='Chest Icon'
            width={256}
            height={256}
            src={debouncedURL}
          />
          <Spinner className="w-20 h-20 justify-self-center" show={isLoadingImage} />
        </div>
        <Button className="self-end" type="submit">
          Update Chest
        </Button>
      </form>
    </div>
  );
}

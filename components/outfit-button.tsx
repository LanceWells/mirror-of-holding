'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { OutfitType } from '@prisma/client';
import { CharacterBodyLayer, updateParts } from '@/lib/store/character-body';

export type PartButtonProps = JSX.IntrinsicElements['button'] & {
  src: HTMLImageElement['src'];
  name: string;
  outfitType: OutfitType,
  parts: CharacterBodyLayer;
}

export default function OutfitButton(props: PartButtonProps) {
  const {
    src,
    name,
    outfitType,
    parts,
    ...others
  } = props;

  const dispatch = useDispatch();
  const handleClick = useCallback(
    () => dispatch(
      updateParts(
        {
          outfitType,
          parts,
        }
      )
    ), [dispatch, outfitType, parts]
  );

  return (
    <button
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'h-16',
        'w-16',
        'rounded-full',
        'bg-primary-200',
        'hover:bg-primary-300',
        'drop-shadow-sm',
      )}
      {...others}
      onClick={handleClick}
    >
      <Image
        className="m-1"
        src={src}
        alt={name}
        width={48}
        height={48}
      />
    </button>
  );
}

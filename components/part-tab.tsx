"use client";

import { useCharacterContext } from '@/lib/character-selection-context';
import { PartType } from '@prisma/client';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

type PartTabProps = PropsWithChildren<{
  partType: PartType;
}>;

export default function PartTab(props: PartTabProps) {
  const {
    partType,
    children,
  } = props;

  const character = useCharacterContext();

  return (
    <div key={`${partType}-tab`} className={clsx(
      character.VisibleTab !== partType && 'hidden',
      'p-3',
      'flex',
      'rounded-lg',
      'overflow-y-auto',
      'grid grid-rows-[1fr_35px]',
      'gap-y-6',
      'justify-center',
      'bg-slate-200',
      'dark:bg-slate-700',
      'drop-shadow-md',
    )}>
      <div className='flex justify-center'>
        {children}
      </div>
      <button className='button-std flex items-center justify-between align-middle w-32 px-4 py-2'>
        <Image
          src="/paint-roller.svg"
          alt="Recolor Icon"
          width={24}
          height={24}
          className='fill-white'
        />
        <p><b>Recolor</b></p>
      </button>
    </div>
  );
}

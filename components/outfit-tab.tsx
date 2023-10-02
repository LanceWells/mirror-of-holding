"use client";

import { OutfitType } from '@prisma/client';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import RecolorPalette from './recolor-palette';
import { useOutfitTabSelector } from '@/lib/store/character-body';

type OutfitTabProps = PropsWithChildren<{
  outfitType: OutfitType;
}>;

export default function OutfitTab(props: OutfitTabProps) {
  const {
    outfitType,
    children,
  } = props;

  const selectedOutfitType = useOutfitTabSelector();

  return (
    <div key={`${outfitType}-tab`} className={clsx(
      selectedOutfitType !== outfitType && 'hidden',
      'p-3',
      'rounded-lg',
      'overflow-y-auto',
      'grid grid-cols-[1fr_70px]',
      'gap-y-6',
      'justify-center',
      'bg-slate-200',
      'dark:bg-slate-700',
      'drop-shadow-md',
    )}>
      <div className='flex justify-center'>
        {children}
      </div>
      <RecolorPalette thisTab={outfitType} />
    </div>
  );
}

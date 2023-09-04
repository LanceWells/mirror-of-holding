import { OutfitType, PartType } from '@prisma/client';
import React from 'react';
import OutfitTabSelector from './outfit-tab-selector';
import OutfitTab from './outfit-tab';
import clsx from 'clsx';

export type OutfitGridProps = {
  outfits: Map<OutfitType, JSX.Element[]>;
};

export default async function OutfitGrid(props: OutfitGridProps) {
  const {
    outfits,
  } = props;

  const tabSelectors = Object.keys(OutfitType)
    .map((o) => (
      <OutfitTabSelector
        key={`${o}-tab-selector`}
        outfitType={o as OutfitType} />
    ))

  const tabs = Object.keys(OutfitType)
    .map((o) => (
      <OutfitTab key={`${o}-tab`} outfitType={o as OutfitType}>
        {outfits.get(o as OutfitType)}
      </OutfitTab>
    ))

  return (
    <div className='grid grid-cols-1 grid-rows-[125px_1fr] sm:w-full md:max-w-screen-lg'>
      <div className={clsx(
        'sm:relative',
        'xs:w-max',
        'lg:flex',
        'lg:flex-wrap',
        'lg:max-w-full',
        'justify-center',
      )}>
        {tabSelectors}
      </div>
      <div>
        {tabs}
      </div>
    </div>
  );
}

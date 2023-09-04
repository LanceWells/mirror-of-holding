import { OutfitType, PartType } from '@prisma/client';
import React from 'react';
import OutfitTabSelector from './outfit-tab-selector';
import OutfitTab from './outfit-tab';

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
    <div className='px-4 max-w-screen-lg'>
      <div className='flex mx-2 justify-center w-full flex-wrap'>
        {tabSelectors}
      </div>
      <div>
        {tabs}
      </div>
    </div>
  );
}

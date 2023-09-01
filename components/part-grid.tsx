import { PartType } from '@prisma/client';
import React from 'react';
import PartTabSelector from './part-tab-selector';
import PartTab from './part-tab';

export type PartGridProps = {
  Parts: {
    [P in keyof typeof PartType]: JSX.Element[];
  }
};

export default async function PartGrid(props: PartGridProps) {
  const {
    Parts: parts,
  } = props;

  const tabSelectors = Object.keys(PartType)
    .filter((p) => !['RightArm', 'RightLeg'].includes(p))
    .map((p) => (
      <PartTabSelector
        key={`${p}-tab-selector`}
        partType={p as keyof typeof PartType}
      />
    )
  );

  const tabs = Object.entries(parts)
    .map(([k, v]) => (
      <PartTab
        key={`${k}-tab`}
        partType={k as keyof typeof PartType}
      >
        {v}
      </PartTab>
    )
  );

  return (
    <div className='mb-3'>
      <div className='flex m-2'>
        {tabSelectors}
      </div>
      <div>
        {tabs}
      </div>
    </div>
  );
}

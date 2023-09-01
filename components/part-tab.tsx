"use client";

import { useCharacterContext } from '@/lib/character-selection-context';
import { PartType } from '@prisma/client';
import React, { PropsWithChildren } from 'react';

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
    <div key={`${partType}-tab`} style={{
      display: character.VisibleTab === partType ? 'inherit' : 'none'
    }}>
      {children}
    </div>
  );
}

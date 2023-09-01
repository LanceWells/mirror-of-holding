"use client"

import React, { useContext, useMemo } from "react"
import Image from "next/image";
import { BodyPartImage, CharacterState } from "@/lib/character-selection-reducer";
import { CharacterSelectionDispatchContext } from "@/lib/character-selection-context";
import clsx from "clsx";

export type PartButtonProps = JSX.IntrinsicElements['button'] & {
  src: string;
  name: string;
  parts: BodyPartImage[];
}

export default function OutfitButton(props: PartButtonProps) {
  const {
    src,
    name,
    parts,
    ...others
  } = props;

  const dispatch = useContext(CharacterSelectionDispatchContext);

  const handleClick = useMemo(() => () => {
    const outfit: Partial<CharacterState['Parts']> = {};
    for (let p of parts) {
      outfit[p.partType] = p;
    }

    dispatch({
      type: 'updateParts',
      parts: outfit,
    })
  }, [parts])

  return (
    <button
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'h-16',
        'w-16',
        'rounded-full',
        'ring-2',
        'bg-primary-accent-100',
        'ring-primary-200',
        'hover:bg-primary-accent-200',
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
  )
}

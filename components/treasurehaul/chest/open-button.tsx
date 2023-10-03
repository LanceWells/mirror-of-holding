"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export default function HaulOpenButton() {
  const [visible, setVisible] = useState(true);
  const [image, setImage] = useState('/WoodenBouncingChest.gif');
  
  const onClick = useCallback(() => {
    setImage('/WoodenOpeningChest.gif');
    setTimeout(() => {
      const cards = document.querySelectorAll('[data-item-card') as NodeListOf<HTMLElement>;
      cards.forEach((c) => {
        c.style.animationPlayState = 'running';
        c.style.pointerEvents = 'auto';
      });
      setVisible(false);
    }, 1000)
  }, [])

  return (
    <button onClick={onClick} className={clsx(
      ['absolute'],
      ['rounded-full'],
      ['bg-cyan-600', 'dark:bg-cyan-800'],
      ['hover:bg-cyan-500', 'hover:dark:bg-cyan-700'],
      ['transition-all'],
      ['drop-shadow-md'],
      ['z-50'],
      visible
        ? ['opacity-100', 'pointer-events-auto']
        : ['opacity-0', 'pointer-events-none'],
    )}>
      <Image
        src={image}
        alt='Open Chest'
        width={128}
        height={128}
        className='-translate-y-1'
      />
    </button>
  )
}

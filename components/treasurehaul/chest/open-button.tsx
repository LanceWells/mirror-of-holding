'use client';

import { CircleIcon } from '@/components/svgs';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import isURL from 'validator/lib/isURL';

export type HaulOpenButtonProps = {
  imageSrc: string;
}

export default function HaulOpenButton(props: HaulOpenButtonProps) {
  const {
    imageSrc,
  } = props;

  const imgSrcToUse = isURL(imageSrc ?? '') ? imageSrc : '/WoodenStaticChest.png';
  const [visible, setVisible] = useState(true);
  const [mouseOverButton, setMouseOverButton] = useState(false);

  const onClick = useCallback(() => {
    // setImage('/WoodenOpeningChest.gif');
    const cards = document.querySelectorAll('[data-item-card') as NodeListOf<HTMLElement>;
    cards.forEach((c) => {
      c.style.animationPlayState = 'running';
      c.style.pointerEvents = 'auto';
    });
    setVisible(false);
  }, []);

  return (
    <button
      onMouseEnter={() => setMouseOverButton(true)}
      onMouseLeave={() => setMouseOverButton(false)}
      onClick={onClick}
      className={clsx(
        ['absolute'],
        ['rounded-full'],
        ['bg-cyan-600', 'dark:bg-cyan-800'],
        ['hover:bg-cyan-500', 'hover:dark:bg-cyan-700'],
        ['transition-all'],
        ['drop-shadow-md'],
        ['z-10'],
        ['w-[128px]', 'h-[128px]'],
        ['flex', 'place-content-center'],
        visible
          ? ['opacity-100', 'pointer-events-auto']
          : ['opacity-0', 'pointer-events-none'],
      )}>
      <img
        src={imgSrcToUse}
        alt='Open Chest'
        width={128}
        height={128}
        className={clsx(
          'absolute w-[128px] h-[128px] z-30 -top-[48px]',
          mouseOverButton && 'animate-bounce',
        )}
      />
      <CircleIcon className={clsx(
        'z-20 w-[64px] h-[64px] fill-black',
        'absolute',
        'self-center justify-self-center',
        'bottom-4',
        'scale-y-[0.4]',
        mouseOverButton && 'animate-shadow',
      )} />
    </button>
  );
}

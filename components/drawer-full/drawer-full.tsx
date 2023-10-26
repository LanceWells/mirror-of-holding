'use client';

import clsx from 'clsx';
import { ReactNode, ReactNodeArray } from 'react';

export type DrawerProps<T extends string> = {
  drawerStates: {
    [P in T]: ReactNode
  };
  onClose: () => void;
  buttons: ReactNode[];
  drawerOpen: T | null;
}

export default function DrawerFull<T extends string>(props: DrawerProps<T>) {
  const {
    drawerStates,
    onClose,
    drawerOpen,
    buttons,
  } = props;

  const drawerChild = drawerOpen ? drawerStates[drawerOpen] : (<></>);

  return (
    <div className={clsx(
      'transition-transform',
      'grid grid-rows-[min-content_1fr]',
      drawerOpen ? 'h-[38rem] min-h-[38rem]' : 'translate-y-[calc(100%-4rem)]',
    )}>
      <div className={clsx(
        'w-full h-16',
        'bg-white dark:bg-gray-800',
        'flex flex-row justify-evenly align-baseline items-center',
        'p-1',
      )}>
        {buttons}
      </div>
      <div className={clsx(
        'bg-white dark:bg-gray-900',
        'overflow-y-hidden',
      )}>
        {drawerChild}
      </div>
    </div>
  );
}

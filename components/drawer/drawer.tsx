'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';
import { CloseIcon } from '../svgs';

export type DrawerProps<T extends string> = {
  drawerStates: {
    [P in T]: ReactNode
  };
  onClose: () => void;
  drawerOpen: T | null;
}

export default function Drawer<T extends string>(props: DrawerProps<T>) {
  const {
    drawerStates,
    onClose,
    drawerOpen,
  } = props;

  const drawerChild = drawerOpen ? drawerStates[drawerOpen] : (<></>);

  return (
    <div className={clsx(
      ['fixed'],
      ['left-0', 'top-0'],
      ['z-40'],
      ['w-screen', 'h-screen'],
      ['grid', 'grid-cols-[min-content_1fr]'],
      ['pointer-events-none'],
    )}>
      <div className={clsx(
        ['bg-gray-100', 'dark:bg-gray-800'],
        ['relative'],
        ['top-0', 'left-0'],
        ['z-50'],
        ['h-full', 'w-96'],
        ['p-4'],
        ['overflow-y-auto', 'overflow-x-hidden'],
        ['pointer-events-auto'],
        ['transition-transform'],
        drawerOpen ? '' : '-translate-x-full',
      )}>
        <button
          onClick={onClose}
          className={clsx(
            ['absolute', 'top-0', 'right-0'],
            ['bg-slate-300', 'hover:bg-slate-200', 'dark:bg-slate-900', 'dark:hover:bg-slate-700'],
            ['transition-colors'],
            ['z-50'],
            ['m-1', 'p-2'],
            ['rounded-full'],
          )}
        >
          <CloseIcon className='fill-gray-900 dark:fill-gray-50 w-8 h-8' />
        </button>
        {drawerChild}
      </div>
      <div
        onClick={onClose}
        className={clsx(
          ['relative'],
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )} />
      <div className={clsx(
        ['bg-black/40'],
        ['fixed'],
        ['w-full', 'h-full'],
        ['transition-opacity'],
        ['pointer-events-none'],
        drawerOpen ? 'opacity-100' : 'opacity-0',
      )} />
    </div>
  );
}

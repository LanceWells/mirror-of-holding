import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export type HaulContentsProps = {}

export default function HaulContents(props: PropsWithChildren<HaulContentsProps>) {
  const {
    children,
  } = props;

  return (
    <div className={clsx(
      'flex justify-center items-center overflow-y-auto',
    )}>
      <div className={clsx(
        'bg-white', 'dark:bg-slate-900',
        'border', 'border-gray-200', 'dark:border-gray-700',
        'shadow-md',
        'rounded-lg',
        'flex', 'items-center', 'justify-center', 'justify-items-center', 'flex-wrap',
        'w-[90%]', 'md:w-[80%]',
        'min-h-[240px]', 'max-h-[80vh]',
        'overflow-y-auto',
      )}>
        {children}
      </div>
    </div>
  );
}

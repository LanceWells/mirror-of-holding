import clsx from 'clsx';
import { MutableRefObject, PropsWithChildren, forwardRef } from 'react';

export type HaulContentsProps = {}

export const HaulContents = forwardRef<HTMLDivElement, PropsWithChildren<HaulContentsProps>>(
  function HaulContents(props, ref) {
    const {
      children,
    } = props;

    return (
      <div className={clsx(
        'flex place-content-center',
      )}>
        <div id='haul-contents' className={clsx(
          'bg-white dark:bg-slate-900',
          'border border-gray-200 dark:border-gray-700',
          'shadow-md',
          'rounded-lg',
          'w-[90%]', 'md:w-[80%]',
          'min-h-[240px]', 'max-h-[80vh]',
          'overflow-y-auto',
          'relative'
        )}>
          <div ref={ref} id='haul-test-cont' className={clsx(
            'flex place-content-center flex-wrap',
            'overflow-y-hidden',
          )}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

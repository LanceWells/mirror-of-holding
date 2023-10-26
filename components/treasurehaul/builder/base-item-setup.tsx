import clsx from 'clsx';
import { ReactNode } from 'react';
import BuilderSearch from './builder-search';
import { MagnifyingGlassIcon } from '@/components/svgs';

export default function BaseItemSetup(props: { itemSelector: ReactNode }) {
  return (
    <div className={clsx(
      'grid grid-cols-[32px_1fr] grid-rows-[auto_auto_auto_1fr]',
      'gap-y-2 gap-x-1',
      'h-full',
      'p-4',
    )}
      style={{
        gridTemplateAreas: `
          "title        title"
          "hr           hr"
          "search-icon  search-box"
          "options      options"
        `
      }}
    >
      <h2 className="[grid-area:title] text-xl text-black dark:text-slate-50">
        Add an Item
      </h2>
      <hr className="[grid-area:hr] w-full mb-8" />
      <MagnifyingGlassIcon className='fill-gray-900 dark:fill-gray-50 w-32 h-32' />
      <div className="[grid-area:search-box]">
        <BuilderSearch />
      </div>
      <div className="[grid-area:options] grid overflow-y-auto">
        {props.itemSelector}
      </div>
    </div>
  );
}

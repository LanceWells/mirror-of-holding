import { BaseItem } from "@prisma/client";
import prisma from '../../../lib/prisma'
import BaseItemContainer from "./base-item-container";
import clsx from "clsx";
import BlankItemContainer from "./blank-item-container";

type ItemSelectorProps = {};

async function LoadBaseItems(): Promise<BaseItem[]> {
  return prisma.baseItem.findMany();
}

export default async function ItemSelector(props: ItemSelectorProps) {
  const haul = await LoadBaseItems();

  const itemOptions = haul.map((item) => (
    <BaseItemContainer item={item}/>
  ));

  return (
    <div className={clsx(
      'bg-white',
      'dark:bg-gray-700',
      'border-gray-200',
      'dark:border-gray-900',
      'bg-gradient-to-br',
      'rounded-lg',
      'border',
      'shadow-sm',
      'grid',
      'grid-cols-[repeat(3,_minmax(min-content,_max-content))]',
      'justify-center',
      'overflow-y-auto',
      'overflow-x-hidden',
    )}>
      <BlankItemContainer />
      {itemOptions}
    </div>
  );
}

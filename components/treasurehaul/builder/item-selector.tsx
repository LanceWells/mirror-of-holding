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
      ['bg-white', 'dark:bg-gray-700', 'bg-gradient-to-br'],
      ['border', 'border-gray-200', 'dark:border-gray-900'],
      ['rounded-lg'],
      ['shadow-sm'],
      ['flex', 'flex-wrap', 'justify-center', 'content-start'],
      ['overflow-y-auto', 'overflow-x-hidden'],
    )}>
      <BlankItemContainer />
      {itemOptions}
    </div>
  );
}

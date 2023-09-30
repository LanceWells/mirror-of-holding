import { BaseItem } from "@prisma/client";
import prisma from '../../../lib/prisma'
import BaseItemContainer from "./base-item-container";
import clsx from "clsx";

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
      '[grid-area:selector]',
      'from-slate-300',
      'to-slate-600',
      'bg-gradient-to-br',
      'rounded-xl',
      'border-slate-500',
      'border-4',
      'm-2',
    )}>
      {itemOptions}
    </div>
  );
}

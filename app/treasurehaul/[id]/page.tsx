// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';
import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma'
import { TreasureHaulItem } from '@/lib/treasurehaul/treasure-haul-payload';
import { JsonObject } from '@prisma/client/runtime/library';
import ItemCard from '@/components/treasurehaul/item-card';

export default function TreasureHaul({ params }: { params: { id: string } }) {
  return (
    <main>
      <HaulContents roomID={params.id} />
    </main>
  );
}

async function HaulContents(props: { roomID: string }) {
  const {
    roomID,
  } = props;

  const idAsNum = Number.parseInt(roomID);

  const thisHaul = await prisma.treasureHaul.findFirst({
    where: {
      id: idAsNum,
    }
  });
  
  if (!thisHaul || !thisHaul.item || typeof thisHaul.item !== 'object' || !(thisHaul.item as any)['haul']) {
    return (<div></div>);
  }

  const items = ((thisHaul.item as any)['haul'] as TreasureHaulItem[]).map((item) => (
    <ItemCard
      item={item}
      itemKey='testing'
    />
  ))

  return (
    <div>
      {items}
    </div>
  )
}

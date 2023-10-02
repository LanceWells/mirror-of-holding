// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';
import prisma from '../../../lib/prisma'
import { TreasureHaulItem, TreasureHaulPayload } from '@/lib/treasurehaul/treasure-haul-payload';
import ItemCard from '@/components/treasurehaul/item-card';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const idAsNum = Number.parseInt(id);

  const metadata: Metadata = {
    title: 'A mysterious chest . . .',
    description: 'What does it hold?',
    openGraph: {
      images: [
        'https://jagtjjiirouufnquzlhr.supabase.co/storage/v1/object/public/mirror-of-holding/TreasureHaul/Icons/WoodenStaticChest.png?t=2023-10-02T17%3A18%3A41.919Z'
      ]
    }
  }

  const thisHaul = await prisma.treasureHaul.findFirst({
    where: {
      id: idAsNum,
    }
  });
  
  if (!thisHaul || !thisHaul.id || !thisHaul.item) {
    return metadata;
  }

  const thisHaulObj = thisHaul as unknown as TreasureHaulPayload;

  if (thisHaulObj.roomName) {
    metadata.title = thisHaulObj.roomName;
  }

  if (thisHaulObj.previewImageSrc) {
    metadata.openGraph = metadata.openGraph ?? {};
    metadata.openGraph.images = [thisHaulObj.previewImageSrc];
  }

  return metadata;
}

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

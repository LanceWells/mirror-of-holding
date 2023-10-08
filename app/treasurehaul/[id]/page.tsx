// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';
import prisma from '../../../lib/prisma'
import { TreasureHaulPayload } from '@/lib/treasurehaul/treasure-haul-payload';
import { Metadata } from 'next';
import clsx from 'clsx';
import { Suspense } from 'react';
import DrawerContainer from '@/components/treasurehaul/chest/drawer-container';
import ChestItemDetailsPane from '@/components/treasurehaul/chest/item-details-pane';
import ChestDetails from '@/components/chestDetails/chest-details';
import HaulContentsContainer from '@/components/treasurehaul/chest/haul-contents-container';

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

  const thisHaulObj = thisHaul as unknown as { item: TreasureHaulPayload };

  if (thisHaulObj.item.roomName) {
    metadata.title = thisHaulObj.item.roomName;
  }

  if (thisHaulObj.item.previewImageSrc) {
    metadata.openGraph = metadata.openGraph ?? {};
    metadata.openGraph.images = [thisHaulObj.item.previewImageSrc];
  }

  return metadata;
}

export default function TreasureHaul({ params }: { params: { id: string } }) {
  return (
    <main className={clsx(
      'min-h-screen',
      'max-h-screen',
      'bg-slate-50',
      'dark:bg-slate-950',
      'top-0',
    )}>
      <Suspense fallback={'Loading'}>
        <HaulContentsLoader roomID={params.id} />
      </Suspense>
      <DrawerContainer
        drawerStates={{
          ViewDetails: (<ChestItemDetailsPane />),
        }}
      />
    </main>
  );
}

async function HaulContentsLoader(props: { roomID: string }) {
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

  const thisHaulObj = (thisHaul.item as TreasureHaulPayload);

  return (
    <div className={clsx(
      ['w-screen', 'h-screen', 'overflow-y-hidden'],
      ['grid', 'grid-rows-[min-content_auto]', 'content-center', 'gap-y-8']
    )}>
      <ChestDetails chestName={thisHaulObj.roomName} />
      <HaulContentsContainer haul={thisHaulObj} />
    </div>
  )
}

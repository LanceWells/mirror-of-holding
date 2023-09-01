import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';
import AppWrapper from './wrapper';
import PartGrid, { PartGridProps } from '@/components/part-grid';
import prisma from '../lib/prisma'
import { BodyLayout, PartType } from '@prisma/client';
import OutfitButton from '@/components/outfit-button';
import { OutfitQuery } from '@/lib/utils';
import CharacterCanvas from '@/components/character-canvas';
import { BodyPartImage } from '@/lib/character-selection-reducer';
import { buffer } from 'stream/consumers';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

type ContentQuery = {
  Outfits: OutfitQuery[];
  Layouts: BodyLayout[];
}

async function LoadImages(): Promise<ContentQuery> {
  const [
    outfits,
    layouts,
  ] = await Promise.all([
    prisma.outfit.findMany({
      include: {
        parts: true
      }
    }),
    prisma.bodyLayout.findMany(),
  ]);

  return {
    Outfits: outfits,
    Layouts: layouts,
  };
}

export default async function Home() {
  const bodyOptions = await LoadImages();
  const outfitCategories = new Map<PartType, OutfitQuery[]>();

  for (let o of bodyOptions.Outfits) {
    for (let p of o.parts) {
      if (!outfitCategories.has(p.partType)) {
        outfitCategories.set(p.partType, []);
      }

      outfitCategories.get(p.partType)!.push(o);
    }
  }

  const tabPanels = [...outfitCategories.entries()].reduce((prev, [k, v]) => {
    const buttons = v.map((o) => {
      const imgBuf = o.parts.find((p) => p.partType === k)?.image ?? Buffer.from([]);
      const imgb64 = imgBuf.toString('base64');
      const imgUrl = `data:image/png;base64,${imgb64}`;
      
      const toClientPart = (p: OutfitQuery['parts'][number]): BodyPartImage => ({
        anchorX: p.anchorX,
        anchorY: p.anchorY,
        name: p.name,
        partType: p.partType,
      });

      const clientParts = o.parts.map(toClientPart);
      return (
        <OutfitButton
          name={o.name}
          parts={clientParts}
          src={imgUrl}
        />
      )
    });

    prev[k] = buttons;
    return prev;
  }, {} as PartGridProps['Parts'])

  return (
    <AppWrapper>
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <Suspense fallback={<TablePlaceholder />}>
          <Table />
          <PartGrid Parts={tabPanels}/>
          <CharacterCanvas />
        </Suspense>
        <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
          <Link
            href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
            className="flex items-center space-x-2"
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
            <p className="font-light">Source</p>
          </Link>
        </div>
      </main>
    </AppWrapper>
  );
}

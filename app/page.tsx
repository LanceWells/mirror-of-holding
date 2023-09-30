import prisma from '../lib/prisma'
import { OutfitType, PartType } from '@prisma/client';
import OutfitButton from '@/components/outfit-button';
import CharacterCanvas from '@/components/character-canvas';
import clsx from 'clsx';
import OutfitGrid from '@/components/outfit-grid';
import { OutfitThumbnailConfig } from '@/lib/outfit-configuration';
import { ContentQuery } from '@/lib/utils';
import { CharacterBodyLayer, BodyPart_Client } from '@/lib/store/character-body';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

async function LoadImages(): Promise<ContentQuery> {
  const [
    outfits,
    layouts,
  ] = await Promise.all([
    prisma.outfit.findMany({
      include: {
        parts: true,
      },
    }),
    prisma.bodyLayout.findMany(),
  ]);

  return {
    Outfits: outfits,
    Layouts: layouts,
  };
}

export default async function Home() {
  const outfitOptions = await LoadImages();

  const outfitsMap = new Map(
    Object.keys(OutfitType)
    .map((k) => [k as OutfitType, [] as JSX.Element[]])
  );

  for (let o of outfitOptions.Outfits) {
    const parts: CharacterBodyLayer = Object.fromEntries(o.parts.map((p) => [
      p.partType,
      {
        src: p.src,
        name: p.name,
        anchorX: p.anchorX,
        anchorY: p.anchorY,
        partType: p.partType,
      } as BodyPart_Client
    ])) as CharacterBodyLayer;

    const targetPart = OutfitThumbnailConfig[o.outfitType];
    const srcPart = parts[targetPart as keyof typeof PartType];

    outfitsMap.get(o.outfitType)!.push((
      <OutfitButton
        name={o.name}
        outfitType={o.outfitType}
        parts={parts}
        src={srcPart?.src ?? ""} />
    ));
  }

  return (
    <main className={clsx(
      'relative',
      'grid',
      'grid-cols-1',
      'grid-rows-[300px_1fr]',
      'min-h-screen',
      'justify-items-center',
    )}>
      <CharacterCanvas />
      <OutfitGrid outfits={outfitsMap}/>
    </main>
  );
}

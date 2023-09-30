// Prisma does not support Edge without the Data Proxy currently

import { Suspense } from "react";
import clsx from "clsx";
import ContentsPanel from "@/components/treasurehaul/builder/haul-contents-panel";
import ItemSelector from "@/components/treasurehaul/builder/item-selector";
import ItemDetailsPane from "@/components/treasurehaul/builder/item-details-pane";
import ItemSelectorSkeleton from "@/components/treasurehaul/builder/item-selector-skeleton";

// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Builder() {
  return (
    <main
      className={clsx(
      'relative',
      'min-h-screen',
      'max-h-screen',
      'grid',
      'grid-cols-[400px_1fr]',
      'grid-rows-[1fr_350px]',
      'gap-y-2',
      )}
      style={{
        display: 'grid',
        gridTemplateAreas: `
          "selector   contents"
          "selector   details"
        `
      }}
    >
      <Suspense fallback={(
        <ItemSelectorSkeleton />
      )}>
        <ItemSelector />
      </Suspense>
      <ContentsPanel />
      <ItemDetailsPane />
    </main>
  );
}

// Prisma does not support Edge without the Data Proxy currently

import clsx from "clsx";
import ContentsPanel from "@/components/treasurehaul/builder/haul-contents-panel";
import BuilderDrawer from "@/components/treasurehaul/builder/builder-drawer";
import BuilderToolbar from "@/components/treasurehaul/builder/builder-toolbar";
import ItemSelector from "@/components/treasurehaul/builder/item-selector";

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
      )}
    >
      <ContentsPanel />
      <BuilderDrawer itemSelector={(<ItemSelector />)} />
      <BuilderToolbar />
    </main>
  );
}

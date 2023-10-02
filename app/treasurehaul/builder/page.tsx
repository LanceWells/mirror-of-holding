// Prisma does not support Edge without the Data Proxy currently

import clsx from "clsx";
import ContentsPanel from "@/components/treasurehaul/builder/haul-contents-panel";
import BaseItemSetup from "@/components/treasurehaul/builder/base-item-setup";
import BuilderToolbar from "@/components/treasurehaul/builder/builder-toolbar";
import ItemSelector from "@/components/treasurehaul/builder/item-selector";
import { HaulBuilderDrawerStates } from "@/lib/drawer-states";
import ItemDetailsPane from "@/components/treasurehaul/builder/item-details-pane";
import Drawer from "@/components/drawer/drawer";

// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Builder() {
  return (
    <main
      className={clsx(
        'min-h-screen',
        'max-h-screen',
        'bg-slate-50',
        'dark:bg-slate-950',
      )}
    >
      <ContentsPanel />
      <Drawer<HaulBuilderDrawerStates>
        drawerStates={{
          PickBaseItem: (<BaseItemSetup itemSelector={(<ItemSelector />)} />),
          EditDetails: (<ItemDetailsPane />),
        }}
      />
      <BuilderToolbar />
    </main>
  );
}

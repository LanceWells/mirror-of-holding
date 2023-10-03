// Prisma does not support Edge without the Data Proxy currently

import clsx from "clsx";
import ContentsPanel from "@/components/treasurehaul/builder/haul-contents-panel";
import BuilderToolbar from "@/components/treasurehaul/builder/builder-toolbar";
import DrawerContainer from "@/components/treasurehaul/builder/drawer-container";
import BaseItemSetup from "@/components/treasurehaul/builder/base-item-setup";
import ItemSelector from "@/components/treasurehaul/builder/item-selector";
import ItemDetailsPane from "@/components/treasurehaul/builder/item-details-pane";
import ToastFeed from "@/components/toast/toast-feed";

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
      <DrawerContainer
        drawerStates={{
          PickBaseItem: (<BaseItemSetup itemSelector={(<ItemSelector />)} />),
          EditDetails: (<ItemDetailsPane />),
        }}
      />
      <BuilderToolbar />
      <ToastFeed />
    </main>
  );
}

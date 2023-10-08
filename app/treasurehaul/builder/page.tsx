// Prisma does not support Edge without the Data Proxy currently

import clsx from "clsx";
import BuilderToolbar from "@/components/treasurehaul/builder/builder-toolbar";
import DrawerContainer from "@/components/treasurehaul/builder/drawer-container";
import BaseItemSetup from "@/components/treasurehaul/builder/base-item-setup";
import ItemSelector from "@/components/treasurehaul/builder/item-selector";
import ItemDetailsPane from "@/components/treasurehaul/builder/item-details-pane";
import ToastFeedContainer from "@/components/treasurehaul/builder/toast-feed-container";
import ChestDetailsEditor from "@/components/treasurehaul/builder/chest-details-editor";
import ChestDetailsContainer from "@/components/treasurehaul/builder/chest-details-container";
import HaulContentsContainer from "@/components/treasurehaul/builder/haul-contents-container";

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
        'top-0',
      )}
    >
      <div className={clsx(
        ['w-screen', 'h-screen', 'overflow-y-hidden'],
        ['grid', 'grid-rows-[min-content_auto]', 'content-center', 'gap-y-8']
      )}>
        <ChestDetailsContainer />
        <HaulContentsContainer />
      </div>
      <DrawerContainer
        drawerStates={{
          PickBaseItem: (<BaseItemSetup itemSelector={(<ItemSelector />)} />),
          EditDetails: (<ItemDetailsPane />),
          EditChestDetails: (<ChestDetailsEditor />),
        }}
      />
      <BuilderToolbar />
      <ToastFeedContainer />
    </main>
  );
}

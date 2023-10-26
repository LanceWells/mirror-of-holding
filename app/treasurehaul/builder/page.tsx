// Prisma does not support Edge without the Data Proxy currently

import clsx from 'clsx';
import BuilderToolbar from '@/components/treasurehaul/builder/builder-toolbar';
import DrawerContainer from '@/components/treasurehaul/builder/drawer-container';
import BaseItemSetup from '@/components/treasurehaul/builder/base-item-setup';
import ItemSelector from '@/components/treasurehaul/builder/item-selector';
import ItemDetailsPane from '@/components/treasurehaul/builder/item-details-pane';
import ToastFeedContainer from '@/components/treasurehaul/builder/toast-feed-container';
import ChestDetailsEditor from '@/components/treasurehaul/builder/chest-details-editor';
import ChestDetailsContainer from '@/components/treasurehaul/builder/chest-details-container';
import HaulContentsContainer from '@/components/treasurehaul/builder/haul-contents-container';
import PixiOverlay from '@/components/pixi-overlay-native/pixi-overlay-native';

// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Builder() {
  return (
    <main className={clsx(
      'bg-slate-50 dark:bg-slate-950',
      'overflow-hidden',
      'h-full',
      'grid grid-rows-[min-content_1fr_0px_0px_0px_0px]',
    )}>
      <ChestDetailsContainer />
      <HaulContentsContainer />
      <DrawerContainer
        drawerStates={{
          PickBaseItem: (<BaseItemSetup itemSelector={(<ItemSelector />)} />),
          EditDetails: (<ItemDetailsPane />),
          EditChestDetails: (<ChestDetailsEditor />),
        }}
      />
      <BuilderToolbar />
      <ToastFeedContainer />
      <PixiOverlay />
    </main>
  );
}

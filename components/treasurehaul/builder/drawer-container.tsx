'use client';

import { HaulBuilderDrawerStates } from '@/lib/drawer-states';
import Drawer, { DrawerProps } from '@/components/drawer/drawer';
import { setDrawerOpen, useDrawerOpenSelector } from '@/lib/store/treasure-haul';
import { useDispatch } from 'react-redux';

type DrawerContainerProps = {
  drawerStates: DrawerProps<HaulBuilderDrawerStates>['drawerStates']
}

export default function DrawerContainer(props: DrawerContainerProps) {
  const {
    drawerStates,
  } = props;

  const drawerOpen = useDrawerOpenSelector();
  const dispatch = useDispatch();

  return (
    <Drawer<HaulBuilderDrawerStates>
      drawerStates={drawerStates}
      drawerOpen={drawerOpen}
      onClose={() => dispatch(setDrawerOpen(null))}
    />
  );
}

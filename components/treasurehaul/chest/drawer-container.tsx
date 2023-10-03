"use client";

import Drawer, { DrawerProps } from "@/components/drawer/drawer";
import { ChestDrawerStates } from "@/lib/drawer-states";
import { setDrawerOpen, useDrawerOpenSelector } from "@/lib/store/chest-haul";
import { useDispatch } from "react-redux";

type DrawerContainerProps = {
  drawerStates: DrawerProps<ChestDrawerStates>['drawerStates']
}

export default function DrawerContainer(props: DrawerContainerProps) {
  const {
    drawerStates,
  } = props;

  const drawerOpen = useDrawerOpenSelector();
  const dispatch = useDispatch();

  return (
    <Drawer<ChestDrawerStates>
      drawerStates={drawerStates}
      drawerOpen={drawerOpen}
      onClose={() => dispatch(setDrawerOpen(null))}
    />
  )
}

"use client";

import ChestDetails from "@/components/chestDetails/chest-details";
import { setDrawerOpen, useChestDetailsSelector } from "@/lib/store/treasure-haul";
import { useDispatch } from "react-redux";

export default function ChestDetailsContainer() {
  const chestDetails = useChestDetailsSelector();
  const dispatch = useDispatch();

  return (
    <ChestDetails
      chestName={chestDetails.chestName}
      onEdit={() => dispatch(setDrawerOpen('EditChestDetails'))}
    />
  );
}

'use client';

import ChestDetails from '@/components/chestDetails/chest-details';
import { useChestDetailsSelector } from '@/lib/store/treasure-haul';

export default function ChestDetailsContainer() {
  const chestDetails = useChestDetailsSelector();

  return (
    <ChestDetails
      chestName={chestDetails.chestName}
    />
  );
}

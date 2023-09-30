import SkeletonImage from "@/components/skeleton/skeleton-image";
import clsx from "clsx";

export default function ItemSelectorSkeleton() {
  return (
    <div
      role="status"
      className={clsx(
        'animate-pulse',
        'grid',
        'grid-rows-2',
      )}
    >
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
      <SkeletonImage />
    </div>
  )
}
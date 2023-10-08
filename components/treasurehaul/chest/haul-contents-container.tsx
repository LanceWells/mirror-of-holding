"use client"

import { TreasureHaulPayload } from "@/lib/treasurehaul/treasure-haul-payload"
import clsx from "clsx";
import ItemCard from "../item-card";
import HaulOpenButton from "./open-button";
import { useDispatch } from "react-redux";
import { setDisplayedItem, setDrawerOpen } from "@/lib/store/chest-haul";
import HaulContents from "@/components/haulContents/haul-contents";

export type HaulContentsProps = {
  haul: TreasureHaulPayload;
}

export default function HaulContentsContainer(props: HaulContentsProps) {
  const {
    haul,
  } = props;

  const dispatch = useDispatch();

  const items = Object.entries(haul.haul)
    .map(([key, item], i) => (
      <div data-item-card className={clsx(
        'animate-fold_in',
      )} style={{
        animationDelay: `${i * 750}ms`,
        animationPlayState: 'paused',
        pointerEvents: 'none',
      }}>
        <ItemCard
          item={item}
          itemKey={key}
          onClick={() => {
            dispatch(setDisplayedItem({ item }));
            dispatch(setDrawerOpen('ViewDetails'));
          }}
        />
      </div>
    )
    );

  return (
    <HaulContents>
      <HaulOpenButton imageSrc={haul.previewImageSrc} />
      {items}
    </HaulContents>
  )
}

"use client";

import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { MemoizedRecolorSwatch } from "./recolor-swatch";
import { OutfitType } from "@prisma/client";
import { ColorGroup, ColorReplacement } from "@/lib/colors";
import { setFilter } from "@/lib/store/store";
import { useDispatch } from "react-redux";

export type RecolorButtonProps = JSX.IntrinsicElements['button'] & {
  colorReplacement: ColorReplacement;
  outfit: OutfitType;
};

export default function RecolorButton(props: RecolorButtonProps) {
  const {
    colorReplacement,
    outfit,
    ...others
  } = props;

  const [displayedColor, setDisplayedColor] = useState(colorReplacement.displayColor);
  const [popverOpen, setIsPopoverOpen] = useState(false);

  const onClick = useCallback(() => {
    setIsPopoverOpen(!popverOpen);
  }, [popverOpen]);

  const onClickOutside = useCallback(() => {
    setIsPopoverOpen(false);
  }, [popverOpen]);

  const dispatch = useDispatch();

  const handleSelectColor = useCallback((colorGroup: ColorGroup) => {
    setIsPopoverOpen(false);
    dispatch(setFilter({
      outfitType: outfit,
      filter: {
        newColorGroup: colorGroup,
        replacement: colorReplacement,
      }
    }));
    // tell store to update. add filter from original 
  }, [displayedColor, dispatch]);

  const swatch = (
    <MemoizedRecolorSwatch
      onSelectColor={handleSelectColor}
    />
  );

  return (
    <Popover
      isOpen={popverOpen}
      onClickOutside={onClickOutside}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor=""
          arrowSize={10}
          arrowClassName="text-primary-500"
        >
          {swatch}
        </ArrowContainer>
      )}
    >
        <button
          onClick={onClick}
          className={clsx(
            'w-6',
            'h-6',
            'rounded-full',
            'drop-shadow-sm',
            'hover:shadow-md',
            'hover:brightness-110',
            'transition-all',
            popverOpen && [
              'ring-2',
              'ring-slate-300',
            ]
          )}
          style={{
            backgroundColor: displayedColor,
          }}
          {...others}
        />
    </Popover>
  );
}

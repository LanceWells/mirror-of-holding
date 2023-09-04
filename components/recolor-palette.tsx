"use client";

import { LoadImage } from "@/lib/canvas-processing";
import { ColorInput, ColorReplacement, DefaultColorForPallete, GroupColors, RGBToHexString } from "@/lib/colors";
import { useOutfitSelector, useOutfitTabSelector } from "@/lib/store";
import { OutfitType } from "@prisma/client";
import clsx from "clsx";
import { useLayoutEffect, useState } from "react";

async function GetImagePalletes(
  imgSrcs: string[],
  setColors: (replacements: ColorReplacement[]) => void,
): Promise<void> {
  const imagePromises = imgSrcs.map((src) => LoadImage(src));
  const images = await Promise.all(imagePromises);

  const colorCount = new Map<string, ColorInput>();
  images.forEach((img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) { return undefined; }

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height).data;

    for (let i = 0; i < imgData.length; i += 4) {
      const
        r = imgData[i],
        g = imgData[i+1],
        b = imgData[i+2];

      // Ignore black, white, and grayscale colors.
      if (r === g && g === b) {
        continue;
      }

      const hex = RGBToHexString({ r, g, b });
      let colorObj = {
        rgb: { r, g, b },
        count: 0,
      };

      if (colorCount.has(hex)) {
        colorObj = colorCount.get(hex)!;
      } else {
        colorCount.set(hex, colorObj);
      }

      colorObj.count++;
    }
  });

  const colors: ColorInput[] = [...colorCount.values()];
  const replacements = GroupColors(colors);
  setColors(replacements);
}

export type RecolorPaletteProps = {
  thisTab: OutfitType;
}

export default function RecolorPalette(props: RecolorPaletteProps) {
  const {
    thisTab,
  } = props;

  const outfit = useOutfitSelector();
  const outfitTab = useOutfitTabSelector();

  const [colors, setColors] = useState<ColorReplacement[]>([]);

  useLayoutEffect(() => {
    if (outfitTab !== thisTab) { return; }

    const outfitImages = Object.values(outfit[outfitTab] ?? {}).map((v) => v.src);
    GetImagePalletes(outfitImages, setColors);
  }, [outfit]);

  const ces = colors.map((c) => (
    <button
      style={{
        backgroundColor: c.displayColor,
      }}
      className={clsx(
        'w-6',
        'h-6',
        'rounded-full',
        'drop-shadow-sm',
      )}
    />
  ));

  return (
    <div>
      {ces}
    </div>
  );
}

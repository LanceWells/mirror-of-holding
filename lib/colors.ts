type Colors =
  | '#2e222f' | '#3e3546' | '#625565' | '#966c6c' | '#ab947a'
  | '#694f62' | '#7f708a' | '#9babb2' | '#c7dcd0' | '#ffffff'
  | '#6e2727' | '#ae2334' | '#b33831' | '#e83b3b'
  | '#ea4f36' | '#fb6b1d' | '#f57d4a' | '#e6904e' 
  | '#cd683d' | '#f79617' | '#f9c22b' | '#fbb954' 
  | '#7a3045' | '#9e4539'
  | '#165a4c' | '#239063' | '#1ebc73' | '#91db69'
  | '#4c3e24' | '#676633' | '#a2a947' | '#d5e04b' | '#cddf6c'  | '#fbff86'
  | '#313638' | '#374e4a' | '#547e64' | '#92a984' | '#b2ba90'
  | '#0b5e65' | '#0b8a8f' | '#8eaf9b'
  | '#30e1b9' | '#8ff8e2' | '#323353'
  | '#484a77' | '#4d65b4' | '#4d9be6'
  | '#8fd3ff' | '#45293f' | '#6b3e75'
  | '#905ea9' | '#a884f3' | '#eaaded'
  | '#753c54' | '#a24b6f' | '#ed8099'
  | '#831c5d' | '#c32454' | '#f04f78'
  | '#f68181' | '#fca790' | '#fdcbb0';

enum ColorGroup {
  RED = 0,
  ORANGE_RED,
  ORANGE_BROWN,
  ORANGE_YELLOW,
  YELLOW,
  YELLOW_GREEN ,
  GREEN,
  GREEN_CYAN,
  CYAN,
  CYAN_BLUE,
  BLUE,
  BLUE_MAGENTA,
  MAGENTA,
  MAGENTA_PINK,
  PINK,
  PINK_RED,
}

enum ColorType {
  shade,
  medium,
  tint,
}

type DefaultColorForPallete = {
  [Property in keyof typeof ColorGroup]: string;
}

const DefaultColorForPallete: DefaultColorForPallete = {
  BLUE:           '#4d9be6',
  BLUE_MAGENTA:   '#323353',
  CYAN:           '#8ff8e2',
  CYAN_BLUE:      '#0b8a8f',
  GREEN:          '#91db69',
  GREEN_CYAN:     '#165a4c',
  MAGENTA:        '#905ea9',
  MAGENTA_PINK:   '#c32454',
  ORANGE_BROWN:   '#cd683d',
  ORANGE_RED:     '#b33831',
  ORANGE_YELLOW:  '#f79617',
  PINK:           '#fca790',
  PINK_RED:       '#b33831',
  RED:            '#ae2334',
  YELLOW:         '#f9c22b',
  YELLOW_GREEN:   '#fbff86',
}

const AdjacentColors: {
  [Property in keyof typeof ColorGroup]: ColorGroup[]
} = {
	RED:           [ColorGroup.ORANGE_RED, ColorGroup.PINK_RED],
	ORANGE_RED:    [ColorGroup.RED, ColorGroup.ORANGE_BROWN],
	ORANGE_BROWN:  [ColorGroup.ORANGE_RED, ColorGroup.ORANGE_YELLOW],
	ORANGE_YELLOW: [ColorGroup.ORANGE_BROWN, ColorGroup.YELLOW],
	YELLOW:        [ColorGroup.ORANGE_YELLOW, ColorGroup.YELLOW_GREEN],
	YELLOW_GREEN:  [ColorGroup.YELLOW, ColorGroup.GREEN],
	GREEN:         [ColorGroup.YELLOW_GREEN, ColorGroup.GREEN_CYAN],
	GREEN_CYAN:    [ColorGroup.GREEN, ColorGroup.CYAN],
	CYAN:          [ColorGroup.GREEN_CYAN, ColorGroup.CYAN_BLUE],
	CYAN_BLUE:     [ColorGroup.CYAN, ColorGroup.BLUE],
	BLUE:          [ColorGroup.CYAN_BLUE, ColorGroup.BLUE_MAGENTA],
	BLUE_MAGENTA:  [ColorGroup.BLUE, ColorGroup.MAGENTA],
	MAGENTA:       [ColorGroup.BLUE_MAGENTA, ColorGroup.MAGENTA_PINK],
	MAGENTA_PINK:  [ColorGroup.MAGENTA, ColorGroup.PINK],
	PINK:          [ColorGroup.MAGENTA_PINK, ColorGroup.PINK_RED],
	PINK_RED:      [ColorGroup.PINK, ColorGroup.RED],
};

const ColorWheel: ColorGroup[] = [
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_RED,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_BROWN,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.ORANGE_YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.YELLOW_GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.GREEN_CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.CYAN_BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.BLUE_MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.MAGENTA_PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.PINK_RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
  ColorGroup.RED,
];

// type ColorData = {
//   colorHex: string;
//   colorType: ColorType;
//   colorDelta: number;
// }

// type ColorReplacement = {
//   displayColor: ColorGroup;
//   colors: ColorData[];
// }

type RGB = {
  r: number;
  g: number;
  b: number;
}

type ColorField = {
  colorType: ColorType,
  colorDelta: number,
  rgb: RGB
}

export type ColorReplacement = {
  displayColor: string,
  colors: Map<string, ColorField>
};

export type ColorInput = {
  rgb: RGB,
  count: number;
}

function RGBToHexString(rgb: RGB): string {
  const r = `${rgb.r.toString(16).padStart(2, '0')}`
  const g = `${rgb.g.toString(16).padStart(2, '0')}`
  const b = `${rgb.b.toString(16).padStart(2, '0')}`

  return `#${r}${g}${b}`;
}

function GroupColors(colors: ColorInput[]): ColorReplacement[] {
  type ColorValue = {
    colorHex: ColorInput['rgb'];
    colorValue: number;
    count: number;
  };

  const colorSet: Set<ColorGroup> = new Set();
  const colorMap: Map<ColorGroup, ColorValue[]> = new Map();
  
  colors.map((color) => {
    let r = color.rgb.r / 255.0;
    let g = color.rgb.g / 255.0;
    let b = color.rgb.b / 255.0;

    // https://www.geeksforgeeks.org/program-change-rgb-color-model-hsv-color-model/
    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;
    let h = -1;

    if (cMax === cMin) {
      h = 0;
    } else if (cMax === r) {
      h = (60 * (g - b) / delta + 360) % 360
    } else if (cMax === g) {
      h = (60 * (b - r) / delta + 120) % 360
    } else if (cMax === b) {
      h = (60 * (r - g) / delta + 240) % 360
    }

    const v = cMax * 100;

    const colorGroup = ColorWheel[Math.round(h)]
    colorSet.add(colorGroup);

    const colorList = colorMap.get(colorGroup) ?? [];
    colorList.push({
      colorHex: color.rgb,
      count: color.count,
      colorValue: v,
    });

    colorMap.set(colorGroup, colorList);
  });

  const mapAdjacentColors = (color: ColorGroup): ColorGroup[] => {
    colorSet.delete(color);
    const colorGroup: ColorGroup[] = [color];

    // for (let adjacentColor of AdjacentColors[color]) {
    //   if (colorSet.has(adjacentColor)) {
    //     colorGroup.push(...mapAdjacentColors(adjacentColor));
    //   }
    // }
    const colorGroupCount = Object.keys(ColorGroup).length;
    [(color - 1 % colorGroupCount), (color + 1 % colorGroupCount)]
      .forEach((adjacentColor) => {
        if (colorSet.has(adjacentColor)) {
          colorGroup.push(...mapAdjacentColors(adjacentColor));
        }
      })

    return colorGroup;
  }

  const groupAdjacentColors = (): ColorGroup[][] => {
    const colorGroups: ColorGroup[][] = [];
    while (true) {
      if (colorSet.size === 0) { break; }

      let colorToCheck: ColorGroup = ColorGroup.RED;
      for (let color of colorSet) {
        colorToCheck = color;
      }

      colorGroups.push(mapAdjacentColors(colorToCheck));
    }

    return colorGroups;
  }

  const groups = groupAdjacentColors();

  const replacementMaps = groups.flatMap((g) => {
    const colorSets = g.flatMap((c) => {
      const colors = colorMap.get(c)?.filter(Boolean) as ColorValue[];
      return colors.map((color) => ({
        colorGroup: c,
        colorValue: color.colorValue,
        rgb: color.colorHex,
        count: color.count,
      }))
    });

    const primary = colorSets.sort((a, b) => b.count - a.count)[0];

    const colorFields = colorSets.map((set) => {
      const valueDelta = set.colorValue - primary.colorValue;
      let colorType: ColorType;
      if (valueDelta === 0) {
        colorType = ColorType.medium;
      } else if (valueDelta > 0) {
        colorType = ColorType.tint;
      } else {
        colorType = ColorType.shade;
      }

      const colorGroupCount = Object.keys(ColorGroup).length;
      let colorDelta = (Math.abs(primary.colorGroup - set.colorGroup)) % (colorGroupCount / 2);
      if (primary.colorGroup < set.colorGroup) {
        colorDelta = -colorDelta;
      }

      return [
        RGBToHexString(set.rgb),
        {
          colorType,
          colorDelta,
          rgb: set.rgb,
        }
      ] as [string, ColorField];
    });

    return {
      displayColor: RGBToHexString(primary.rgb),
      colors: new Map(colorFields),
    } as ColorReplacement;
  });

  return replacementMaps;
}


/*
    end up with instructions on how to replace colors within a group.

    we have the groups, and are iterating over each color group.

    a group is a set of related colors within an image.

    Basically, what we want is to know which color is the "primary" color. The idea is that the
    "primary" color is the color that we see the most. If we want to translate this into a
    different color, we'll use the "main" color for that group. Then we need to know what each
    subsequent color should be.

    We need to know whether each color is a medium, shade, or tint; in addition to its color group.
    This lets us look up what color to translate to.

    The color group should be a set number of degrees away from the primary color. That number of
    degrees should be the difference in enum values from the primary color, applied to the color
    to translate to. For example, if our primary color is ORANGE_RED, then ORANGE_BROWN is a degree
    of +1. PINK would be -3.

    The calculation should be something like:
      delta = color - primary

    The problem with that alone is that PINK - ORANGE_RED would give us 13. There are 16 color
    groups, so if the difference between the two is >= 8, then we know that we need to work
    backwards.

    PINK being 14, and ORANGE_RED being 1, then (16 - 14) - 1 = (-2) - 1 = -3.
    In short, (sizeof(ColorGroup) - color) - primary;

    16 - 2 - 1 = 13

    Otherwise, if the two are <= 7 apart, try using the difference:

    MAGENTA = 12 (Primary)
    YELLOW_GREEN = 5 (Color)
    Expect -7
    abs(12 - 5) % 8 = 7; Magenta is larger, so positive.
    

    MAGENTA = 12 (Primary)
    ORANGE_RED = 1 (Color)
    Expect +5
    abs(12 - 1) % 8 = 5; Magenta is larger, so positive.
    13  14  15   0   1
    +1  +2  +3  +4  +5

    ORANGE_RED = 1 (Primary)
    MAGENTA = 12 (Color)
    Expect -5
    abs(1 - 12) % 8 = 5; Orange_red is smaller, so negative.
     0  15  14  13  12
    -1  -2  -3  -4  -5
    

    So then, we find the color with the greatest amount to use as our primary. This color is our
    "medium".

    For every other color, we need two values:
      1. The color group.
      2. The value.

    We then return {
      The Primary Color Group
      The Colors: [
        {
          hex: Primary Color Hex,
          type: "medium",
          delta: 0,
        },
        ...(all other colors)...
        {
          hex: Darker Color Hex,
          type: "shade",
          delta: N
        },
        {
          hex: Lighter Color Hex,
          type: "tint",
          delta: N
        },
      ]
    }
    */

export { GroupColors, DefaultColorForPallete, RGBToHexString };

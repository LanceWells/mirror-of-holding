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

const ColorGroupCount = Object.entries(ColorGroup).length;

enum ColorType {
  shade,
  medium,
  tint,
}

type DefaultColorForPallete = {
  [Property in ColorGroup]: {
    [Property in ColorType]: string;
  };
}

// type DefaultColorForPallete = Map<
//   ColorGroup,
//   Map<
//     ColorType,
//     string
//   >
// >;

// const DefaultColorForPallete: DefaultColorForPallete = {
//   BLUE:           '#4d9be6',
//   BLUE_MAGENTA:   '#323353',
//   CYAN:           '#8ff8e2',
//   CYAN_BLUE:      '#0b8a8f',
//   GREEN:          '#91db69',
//   GREEN_CYAN:     '#165a4c',
//   MAGENTA:        '#905ea9',
//   MAGENTA_PINK:   '#c32454',
//   ORANGE_BROWN:   '#cd683d',
//   ORANGE_RED:     '#b33831',
//   ORANGE_YELLOW:  '#f79617',
//   PINK:           '#fca790',
//   PINK_RED:       '#b33831',
//   RED:            '#ae2334',
//   YELLOW:         '#f9c22b',
//   YELLOW_GREEN:   '#fbff86',
// }

// const DefaultColorForPallete = new Map(
//   [ColorGroup.RED, ]
// );

const DefaultColorForPallete: DefaultColorForPallete = {
  [ColorGroup.RED]:           {
    [ColorType.shade]: '#6e2727',
    [ColorType.medium]: '#b33831',
    [ColorType.tint]: '#e83b3b',
  },
  [ColorGroup.ORANGE_RED]:    {
    [ColorType.shade]: '#cd683d',
    [ColorType.medium]: '#f57d4a',
    [ColorType.tint]: '#fca790'
  },
  [ColorGroup.ORANGE_BROWN]:  {
    [ColorType.shade]: '#fca790',
    [ColorType.medium]: '#fdcbb0',
    [ColorType.tint]: '#fdcbb0'
  },
  [ColorGroup.ORANGE_YELLOW]: {
    [ColorType.shade]: '#f9c22b',
    [ColorType.medium]: '#fbb954',
    [ColorType.tint]: '#fbff86'
  },
  [ColorGroup.YELLOW]:        {
    [ColorType.shade]: '#fbb954',
    [ColorType.medium]: '#fbff86',
    [ColorType.tint]: '#fbff86'
  },
  [ColorGroup.YELLOW_GREEN]:  {
    [ColorType.shade]: '#a2a947',
    [ColorType.medium]: '#d5e04b',
    [ColorType.tint]: '#cddf6c'
  },
  [ColorGroup.GREEN]:         {
    [ColorType.shade]: '#92a984',
    [ColorType.medium]: '#1ebc73',
    [ColorType.tint]: '#91db69'
  },
  [ColorGroup.GREEN_CYAN]:    {
    [ColorType.shade]: '#165a4c',
    [ColorType.medium]: '#239063',
    [ColorType.tint]: '#1ebc73'
  },
  [ColorGroup.CYAN]:          {
    [ColorType.shade]: '#313638',
    [ColorType.medium]: '#0b5e65',
    [ColorType.tint]: '#0b8a8f'
  },
  [ColorGroup.CYAN_BLUE]:     {
    [ColorType.shade]: '#4d9be6',
    [ColorType.medium]: '#8fd3ff',
    [ColorType.tint]: '#8ff8e2'
  },
  [ColorGroup.BLUE]:          {
    [ColorType.shade]: '#323353',
    [ColorType.medium]: '#484a77',
    [ColorType.tint]: '#4d65b4'
  },
  [ColorGroup.BLUE_MAGENTA]:  {
    [ColorType.shade]: '#484a77',
    [ColorType.medium]: '#7f708a',
    [ColorType.tint]: '#a884f3'
  },
  [ColorGroup.MAGENTA]:       {
    [ColorType.shade]: '#2e222f',
    [ColorType.medium]: '#6b3e75',
    [ColorType.tint]: '#905ea9'
  },
  [ColorGroup.MAGENTA_PINK]:  {
    [ColorType.shade]: '#831c5d',
    [ColorType.medium]: '#f04f78',
    [ColorType.tint]: '#ed8099'
  },
  [ColorGroup.PINK]:          {
    [ColorType.shade]: '#7a3045',
    [ColorType.medium]: '#753c54',
    [ColorType.tint]: '#a24b6f'
  },
  [ColorGroup.PINK_RED]:      {
    [ColorType.shade]: '#ae2334',
    [ColorType.medium]: '#f04f78',
    [ColorType.tint]: '#ed8099'
  },
}

/**
 * This array represents a slice of a color wheel, where each degree (0 - 360), represents a
 * separate hue from that wheel. The original source for this value has been lost, but they
 * typically describe what a given hue degree refers to in regards to its color.
 * 
 * This appears a little "extra" in how it's been constructed, yet this array is effectively 360
 * numbers, with O(1) lookup time when converting a hue degree into a hue group.
 */
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

type RGB = {
  r: number;
  g: number;
  b: number;
}

type ColorField = {
  colorType: ColorType,
  colorDelta: number,
  colorGroup: ColorGroup,
  rgb: RGB
}

export type ColorReplacement = {
  displayColor: string,
  colors: {
    [key: string]: ColorField;
  }
};

export type ColorInput = {
  rgb: RGB,
  count: number;
}

/**
 * Converts a given set of RGB values into a hex string.
 * @param rgb The RGB values to convert.
 * @returns The RGB values represented as a hex string.
 */
function RGBToHexString(rgb: RGB): string {
  const r = `${rgb.r.toString(16).padStart(2, '0')}`
  const g = `${rgb.g.toString(16).padStart(2, '0')}`
  const b = `${rgb.b.toString(16).padStart(2, '0')}`

  return `#${r}${g}${b}`;
}

function HexStringToRGB(hex: string): RGB {
  const noHash = hex.replaceAll("#", "");
  const r = parseInt(noHash.substring(0, 2), 16);
  const g = parseInt(noHash.substring(2, 4), 16);
  const b = parseInt(noHash.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * @TODO Work this into an edge function once outfit uploading is enabled. Then a user can just
 * download this processed information associated with an image rather than process it each time on
 * their own machine.
 * 
 * A helper function that converts a list of colors and their given counts into groups of related
 * colors that might be replaced. The general idea is that colors are grouped by color group
 * adjacency, where a gap in adjacent groups would result in two groups.
 * 
 * Each color group contains the series of colors for that group. Each color within that series
 * describes the original color, the color group in the form of a delta, and the relative value of
 * the color to the "primary" color.
 * 
 * Algorithmically, this function takes the following steps:
 *    - Break the input colors into groups of related colors.
 *    - For each group, determine which color is the most prevalent. This becomes the "primary"
 *      color.
 *    - For every color in the group, determine whether or not it is a tint or a shade relative to
 *      the primary color, in addition to how many degrees its own color group is from the primary
 *      color's group.
 * 
 * For example, if we had the following colors:
 * ```
 *    - #2e222f x 10
 *    - #374e4a x 7
 *    - #694f62 x 3
 *    - #c32454 x 2
 * ```
 * 
 * We would first identify the hue for each of each of the colors.
 * ```
 *    - #2e222f x 10 --> 295
 *    - #374e4a x 7  --> 170
 *    - #694f62 x 3  --> 316
 *    - #c32454 x 2  --> 342
 * ```
 * 
 * Each of these hues can be grouped into a "Color Group", which we use our {@link ColorWheel}
 * lookup table to identify.
 * ```
 *    - #2e222f x 10 --> 295 --> Magenta
 *    - #374e4a x 7  --> 170 --> Cyan
 *    - #694f62 x 3  --> 316 --> Magenta
 *    - #c32454 x 2  --> 342 --> Magenta_Pink
 * ```
 * 
 * Then we group each color by those colors adjacent. This gives us:
 * ```
 *    - #2e222f x 10  (Magenta)
 *    - #694f62 x 7   (Magenta)
 *    - #c32454 x 3   (Magenta_Pink)
 * 
 *    - #374e4a x 2   (Cyan)
 * ```
 * 
 * Each color group uses a "primary" color to identify what the intended pallet is. The simplest way
 * to determine this is by the number of times that the color appears in the associated image, as
 * pixel count. That gives us:
 * ```
 *    - #2e222f x 10  (Magenta)       [Primary]
 *    - #694f62 x 7   (Magenta)
 *    - #c32454 x 3   (Magenta_Pink)
 * 
 *    - #374e4a x 2   (Cyan)          [Primary]
 * ```
 * 
 * Now we determine the relative value of each image to understand whether or not it is a tint or a
 * shade relative to the primary color in the group. A "tint" is a color that is brighter than its
 * base color, and a "shade" is a color that is darker than its base color.
 * ```
 *    - #2e222f x 10  (Magenta)       18%   [Primary]
 *    - #694f62 x 7   (Magenta)       41%   [Tint]
 *    - #c32454 x 3   (Magenta_Pink)  76%   [Tint]
 * 
 *    - #374e4a x 2   (Cyan)          31%   [Primary]
 * ```
 * 
 * The final step is to determine how many groups away from the primary group each color is. The
 * intent here is that if we want to recolor the base, then we will need to shift all other related
 * colors appropriately. E.g. if we wanted to shift a red base to orange_red, each color within
 * that color's group needs to shift its own color group by +1 in addition to shifting its own color
 * by a number of groups away from the primary color that it was originally. This keeps a consistent
 * relevancy between the primary color and all secondary colors.
 * ```
 *    - #2e222f x 10  (Magenta)       18%   [Primary]   +0
 *    - #694f62 x 7   (Magenta)       41%   [Tint]      +0
 *    - #c32454 x 3   (Magenta_Pink)  76%   [Tint]      +1
 * 
 *    - #374e4a x 2   (Cyan)          31%   [Primary]   +0
 * ```
 * 
 * @param colors 
 * @returns 
 */
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
          colorGroup: set.colorGroup,
        }
      ] as [string, ColorField];
    });

    return {
      displayColor: RGBToHexString(primary.rgb),
      colors: Object.fromEntries(colorFields),
    } as ColorReplacement;
  });

  return replacementMaps;
}

export {
  GroupColors,
  RGBToHexString,
  HexStringToRGB,
  DefaultColorForPallete,
  ColorGroup,
  ColorGroupCount,
};

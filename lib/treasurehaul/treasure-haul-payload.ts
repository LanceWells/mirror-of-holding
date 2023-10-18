import { BaseItem, BaseItemType } from '@prisma/client';
import { randomInt } from 'crypto';

export type TreasureHaulPayload = {
  haul: {
    [key: string]: TreasureHaulItem
  };
  roomName: string;
  previewImageSrc: string;
}

export type RGBColor = {
  r: number;
  g: number;
  b: number;
}

export type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ItemEffectUniformColor = {
  color: {
    r: number;
    g: number;
    b: number;
  }
}

export type ItemEffectUniformParticles = {
  emitterX: number;
  emitterY: number;
  emitterDirection: number;
  emitterCone: number;
  emitterRadius: number;
  particleFrequency: number;
  particleLifetime: number;
  particleSpeed: number;
  attractorX: number;
  attractorY: number;
  attractorStrength: number;
  startSize: number;
  endSize: number;
  startColor: RGBAColor;
  endColor: RGBAColor;
}

enum TreasureHaulMoneyType {
  Coins,
  Gems,
  Jewelry,
  Paintings,
}

export type ItemEffectNone = {
  type: 'none';
  uniforms?: undefined;
} 

export type ItemEffectFlaming = {
  type: 'flaming';
  uniforms: ItemEffectUniformColor
}

export type ItemEffectEnchanted = {
  type: 'enchanted';
  uniforms?: undefined;
}

export type ItemEffectSparkles = {
  type: 'sparkles';
  uniforms?: undefined;
}

export type ItemEffectParticles = {
  type: 'particles';
  uniforms: ItemEffectUniformParticles;
}

export type ItemEffectWebGPU = {
  type: 'webgpu';
  uniforms?: undefined;
}

export type TreasureHaulItem = {
  itemName: string;
  src: string;
  type: BaseItemType;
  description: string;
  effects:
    | ItemEffectNone
    | ItemEffectFlaming
    | ItemEffectEnchanted
    | ItemEffectSparkles
    | ItemEffectParticles
    | ItemEffectWebGPU;
}

export type ItemEffectOptions = TreasureHaulItem['effects']['type'];

export const ItemEffectOptions: {
  [P in ItemEffectOptions]: P
} = {
  enchanted: 'enchanted',
  flaming: 'flaming',
  sparkles: 'sparkles',
  particles: 'particles',
  webgpu: 'webgpu',
  none: 'none',
};

function GenerateTreasureDetails(
  count: number,
  type: TreasureHaulMoneyType,
): {
  name: string;
  src: string;
} {
  switch(type) {
    case TreasureHaulMoneyType.Coins: {
      if (count === 1) {
        return {
          name: 'A single copper coin',
          src: '/money/coins/single.png',
        };
      }
      if (count < 500) {
        return {
          name: 'A modest coinpurse',
          src: '/money/coins/purse.png',
        };
      }
      if (count < 100000) {
        return {
          name: 'A sizeable stack of coins',
          src: '/money/coins/mound.png',
        };
      }
      else {
        return {
          name: 'A grand wealth',
          src: '/money/coins/chest.png',
        };
      }
    }
    case TreasureHaulMoneyType.Gems: {
      const src = [
        'diamond',
        'emerald',
        'ruby',
        'sapphire',
      ];

      const gemIndex = randomInt(src.length);

      let condition = 'flawless';
      if (count < 100) {
        condition = 'barely recognizable';
      } else if (count < 1000) {
        condition = 'flawed';
      } else if (count < 10000) {
        condition = 'standard';
      }

      return {
        name: `A ${condition} ${src[gemIndex]}`,
        src: `/money/gems/${src[gemIndex]}.png`,
      };
    }
    case TreasureHaulMoneyType.Jewelry: {
      const src = [
        '/money/gems/jewelry1.png',
        '/money/gems/jewelry2.png',
        '/money/gems/jewelry3.png',
        '/money/gems/jewelry4.png',
      ];

      const jewelryIndex = randomInt(src.length);

      let condition = 'flawless';
      if (count < 100) {
        condition = 'damaged';
      } else if (count < 1000) {
        condition = 'forgotten';
      } else if (count < 10000) {
        condition = 'finely decorated';
      }

      return {
        name: `A ${condition} piece of jewelry`,
        src: src[jewelryIndex],
      };
    }
    case TreasureHaulMoneyType.Paintings: {
      const src = [
        '/money/gems/painting1.png',
        '/money/gems/painting2.png',
        '/money/gems/painting3.png',
        '/money/gems/painting4.png',
      ];

      const paintingIndex = randomInt(src.length);

      let condition = 'flawless';
      if (count < 100) {
        condition = 'damaged';
      } else if (count < 1000) {
        condition = 'forgotten';
      } else if (count < 10000) {
        condition = 'finely detailed';
      }

      return {
        name: `A ${condition} painting`,
        src: src[paintingIndex],
      };

    }
    default: {
      return {
        name: 'A forgotten treasure',
        src: '/money/coins/purse.png',
      };
    }
  }
}

const TreasureHaulItemFromBase = (item: BaseItem): TreasureHaulItem => ({
  effects: { type: 'none' },
  itemName: item.name,
  src: item.src,
  type: item.type,
  description: '',
});

function TreasureHaulItemFromMoney(
  copperCount: number,
  moneyType: TreasureHaulMoneyType,
): TreasureHaulItem {
  const details = GenerateTreasureDetails(copperCount, moneyType);

  return {
    effects: { type: 'none' },
    type: BaseItemType.Treasure,
    itemName: details.name,
    src: details.src,
    description: '',
  };
}

function TreasureHaulItemFromBlank() : TreasureHaulItem {
  return {
    effects: { type: 'none' },
    itemName: 'A brand new item',
    src: '',
    type: BaseItemType.MagicItem,
    description: '',
  };
}

const ItemToCardBack: {
  [key in BaseItemType]: string
} = {
  Armor: 'url(/cards/weapon.png)',
  Consumable: 'url(/cards/weapon.png)',
  MagicItem: 'url(/cards/weapon.png)',
  Treasure: 'url(/cards/treasure.png)',
  Weapon: 'url(/cards/weapon.png)',
};

export {
  TreasureHaulMoneyType,
  TreasureHaulItemFromBase,
  TreasureHaulItemFromMoney,
  TreasureHaulItemFromBlank,
  ItemToCardBack,
};

import { BodyLayout, BodyPart, Outfit, PartType } from '@prisma/client';
import ms from 'ms';

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`;
};

export type OutfitQuery = (
  Outfit & {
    parts: BodyPart[],
  }
)

export type ContentQuery = {
  Outfits: OutfitQuery[],
  Layouts: BodyLayout[],
}

export type PartMap = {
  [Property in keyof PartType]: BodyPart;
}

import { BodyPart } from '@prisma/client';
import ms from 'ms';

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`;
};

export type OutfitQuery = {
  name: string;
  parts: BodyPart[];
};

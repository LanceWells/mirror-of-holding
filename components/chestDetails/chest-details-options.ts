export const ChestIconOptions = {
  chest: 'https://jagtjjiirouufnquzlhr.supabase.co/storage/v1/object/public/mirror-of-holding/TreasureHaul/Icons/WoodenStaticChest.png',
  bag: 'https://jagtjjiirouufnquzlhr.supabase.co/storage/v1/object/public/mirror-of-holding/TreasureHaul/Icons/WoodenStaticChest.png',
  custom: 'https://jagtjjiirouufnquzlhr.supabase.co/storage/v1/object/public/mirror-of-holding/TreasureHaul/Icons/WoodenStaticChest.png',
} as const;

export type ChestIconOptions = keyof typeof ChestIconOptions;

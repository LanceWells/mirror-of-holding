export const HaulBuilderDrawerStates = ['PickBaseItem', 'EditDetails', 'EditChestDetails'] as const;
export type HaulBuilderDrawerStates = typeof HaulBuilderDrawerStates[number];

export const ChestDrawerStates = ['ViewDetails'] as const;
export type ChestDrawerStates = typeof ChestDrawerStates[number];

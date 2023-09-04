// import { BodyLayout, BodyPart, BodyType, OutfitType, PartType } from '@prisma/client';
// import { Reducer } from 'react';
// import { produce } from "immer";
// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// export type BodyPartImage = Pick<
//   BodyPart,
//   'name' | 'anchorX' | 'anchorY' | 'partType' | 'src'
// >

// export type SplitParts = {
//   Left: BodyPartImage | null,
//   Right: BodyPartImage | null,
// }

// export type StateLayout = Omit<BodyLayout, 'bodyType'>[];

// export type CharacterState = {
//   BodyType: BodyType,
//   Layouts: StateLayout,
//   Parts: {
//     [Property in keyof typeof PartType]: BodyPartImage | null;
//   },
//   VisibleTab: OutfitType,
// };

// export type CharacterAction =
//   | { type: 'updateParts', parts: Partial<CharacterState['Parts']> }
//   | { type: 'updateBodyType', bodyType: BodyType }
//   | { type: 'updatePartTab', tab: PartType }

// export const CharacterReducer: Reducer<CharacterState, CharacterAction> = (state, action) => {
//   switch(action.type) {
//     case 'updateParts': {
//       const newState = produce(state, (draft) => {
//         SetParts(draft, action.parts);
//       });
//       return newState;
//     }
//     case 'updateBodyType': {
//       const newState = produce(state, (draft) => {
//         draft.BodyType = action.bodyType;
//         SetParts(draft, {});
//       });
//       return newState;
//     }
//     case 'updatePartTab': {
//       const newState = produce(state, (draft) => {
//         draft.VisibleTab = action.tab;
//       });
//       return newState;
//     }
//   }
// };

// function SetParts(state: CharacterState, parts: Partial<CharacterState['Parts']>): CharacterState {
//   const currParts = state.Parts;

//   for (let [key, val] of Object.entries(parts)) {
//     if (val !== undefined) {
//       currParts[key as keyof typeof PartType] = val;
//     }
//   }

//   return state;
// }

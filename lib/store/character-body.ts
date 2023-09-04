// import { BodyPart, PartType, OutfitType, BodyLayout, BodyType } from "@prisma/client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// export type BodyPart_Client = Pick<BodyPart, 'anchorX' | 'anchorY' | 'name' | 'partType' | 'src'>;

// export type CharacterBodyLayer = {
//   [Property in keyof typeof PartType]?: BodyPart_Client;
// }

// export type CharacterBody = {
//   Parts: {
//     [Property in keyof typeof OutfitType]?: CharacterBodyLayer;
//   };
//   Layouts: {
//     [Property in keyof typeof PartType]?: BodyLayout;
//   };
// }

// const DefaultCharacterBody: CharacterBody = {
//   Parts: {},
//   Layouts: {},
// };

// const CharacterBodySlice = createSlice({
//   name: 'characterBody',
//   initialState: DefaultCharacterBody,
//   reducers: {
//     updateParts(state, action: PayloadAction<{
//       outfitType: OutfitType,
//       parts: CharacterBodyLayer,
//     }>) {
//       state.Parts[action.payload.outfitType] = action.payload.parts;
//     }
//   }
// });

// const useCharacterBody = () => useSelector<CharacterBody, CharacterBody>(state => state);

// export { useCharacterBody };
// export const { updateParts } = CharacterBodySlice.actions;
// export default CharacterBodySlice.reducer;

import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { BodyPart, PartType, OutfitType, BodyLayout } from "@prisma/client";
import { useSelector } from "react-redux";

export type BodyPart_Client = Pick<BodyPart, 'anchorX' | 'anchorY' | 'name' | 'partType' | 'src'>;

export type BodyLayout_Client = Pick<BodyLayout, 'anchorX' | 'anchorY'>;

export type CharacterBodyLayer = {
  [Property in keyof typeof PartType]?: BodyPart_Client;
}

export type CharacterBody = {
  Parts: {
    [Property in keyof typeof OutfitType]?: CharacterBodyLayer;
  };
  Layouts: {
    [Property in keyof typeof PartType]?: BodyLayout_Client;
  };
  OutfitType: OutfitType;
}

const DefaultCharacterBody: CharacterBody = {
  Parts: {},
  Layouts: {
    Head:           { anchorX: -1, anchorY: -3 },
    Body:           { anchorX:  0, anchorY:  0 },
    Eyes:           { anchorX: -2, anchorY: -7 },
    Hair:           { anchorX: -2, anchorY: -7 },
    LeftArm:        { anchorX:  3, anchorY: -1 },
    LeftLeg:        { anchorX:  0, anchorY:  4 },
    RightArm:       { anchorX: -2, anchorY: -1 },
    RightLeg:       { anchorX: -2, anchorY:  3 },
    FacialHair:     { anchorX: -2, anchorY: -7 },
    FaceAccessory:  { anchorX: -2, anchorY: -7 },
    HairAccessory:  { anchorX: -2, anchorY: -7 },
  },
  OutfitType: OutfitType.Body,
};

const CharacterBodySlice = createSlice({
  name: 'characterBody',
  initialState: DefaultCharacterBody,
  reducers: {
    updateParts(state, action: PayloadAction<{
      outfitType: OutfitType,
      parts: CharacterBodyLayer,
    }>) {
      state.Parts[action.payload.outfitType] = action.payload.parts;
    },
    updateTab(state, action: PayloadAction<OutfitType>) {
      state.OutfitType = action.payload;
    },
    default(state) {
      return state;
    }
  }
});

const store = configureStore({
  reducer: CharacterBodySlice.reducer,
});

const useOutfitSelector = () =>
  useSelector<CharacterBody, CharacterBody['Parts']>((state) => state.Parts);

const useLayoutSelector = () =>
  useSelector<CharacterBody, CharacterBody['Layouts']>((state) => state.Layouts);

const useOutfitTabSelector = () =>
  useSelector<CharacterBody, CharacterBody['OutfitType']>((state) => state.OutfitType);

export default store;
export const { updateParts } = CharacterBodySlice.actions;
export const { updateTab } = CharacterBodySlice.actions;
export { useOutfitSelector, useLayoutSelector, useOutfitTabSelector };



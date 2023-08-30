import { BodyType } from '@prisma/client';
import { Reducer } from 'react';
import { produce } from "immer";

export type BodyPartImage = {
  url: string,
  anchorX: number,
  anchorY: number,
}

export type SplitParts = {
  Left?: BodyPartImage,
  Right?: BodyPartImage,
}

export type CharacterState = {
  BodyType: BodyType,
  Parts: {
    Body?: BodyPartImage,
    Head?: BodyPartImage,
    Eyes?: BodyPartImage,
    Hair?: BodyPartImage,
    FacialHair?: BodyPartImage,
    HeadAccessory?: BodyPartImage,
    FaceAccessory?: BodyPartImage,
    Arms?: SplitParts,
    Legs?: SplitParts,
  }
};

export type CharacterAction =
  | { type: 'updateParts', parts: CharacterState['Parts'] }
  | { type: 'updateBodyType', bodyType: BodyType }

export const CharacterReducer: Reducer<CharacterState, CharacterAction> = (state, action) => {
  switch(action.type) {
    case 'updateParts': {
      const newState = produce(state, (draft) => {
        SetParts(draft, action.parts);
      });
      return newState;
    }
    case 'updateBodyType': {
      const newState = produce(state, (draft) => {
        draft.BodyType = action.bodyType;
        SetParts(draft, {});
      });
      return newState;
    }
  }

};

function SetParts(state: CharacterState, parts: CharacterState['Parts']): CharacterState {
  const theseParts = state.Parts;

  theseParts.Body = parts.Body;
  theseParts.Head = parts.Head;
  theseParts.Eyes = parts.Eyes;
  theseParts.Hair = parts.Hair;
  theseParts.FacialHair = parts.FacialHair;
  theseParts.HeadAccessory = parts.HeadAccessory;
  theseParts.FaceAccessory = parts.FaceAccessory;

  theseParts.Arms = theseParts.Arms ?? {};
  theseParts.Legs = theseParts.Legs ?? {};

  theseParts.Arms.Left = parts.Arms?.Left ?? theseParts.Arms.Left;
  theseParts.Arms.Right = parts.Arms?.Right ?? theseParts.Arms.Right;

  theseParts.Legs.Left = parts.Legs?.Left ?? theseParts.Legs.Left;
  theseParts.Legs.Right = parts.Legs?.Right ?? theseParts.Legs.Right;

  return state;
}

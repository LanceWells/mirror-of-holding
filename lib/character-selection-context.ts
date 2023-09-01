"use client";

import { Dispatch, createContext, useContext } from "react";
import { CharacterAction, CharacterState } from './character-selection-reducer';

export const CharacterStateDefault = () => ({
  BodyType: "Medium",
  Parts: {
    Body: null,
    Eyes: null,
    FaceAccessory: null,
    FacialHair: null,
    Hair: null,
    Head: null,
    HairAccessory: null,
    LeftArm: null,
    LeftLeg: null,
    RightArm: null,
    RightLeg: null,
  },
  VisibleTab: 'Body',
} as CharacterState)

export const CharacterSelectionContext = createContext<CharacterState>(CharacterStateDefault());
export const CharacterSelectionDispatchContext = createContext<Dispatch<CharacterAction>>(() => ({}));

export const useCharacterContext = () => useContext(CharacterSelectionContext);
export const useCharacterDispatchContext = () => useContext(CharacterSelectionDispatchContext);

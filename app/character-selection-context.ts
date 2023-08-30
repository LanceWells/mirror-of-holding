"use client";

import { Dispatch, createContext } from "react";
import { CharacterAction, CharacterState } from './character-selection-reducer';

export const CharacterSelectionContext = createContext<CharacterState | null>(null);
export const CharacterSelectionDispatchContext = createContext<Dispatch<CharacterAction> | null>(null);

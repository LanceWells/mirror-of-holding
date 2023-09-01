"use client";

import { BodyType } from "@prisma/client";
import React, { useReducer } from "react";
import { CharacterReducer } from "../lib/character-selection-reducer";
import { CharacterSelectionContext, CharacterSelectionDispatchContext, CharacterStateDefault } from "../lib/character-selection-context";

export default function AppWrapper(props: React.PropsWithChildren<{}>) {
  const {children} = props;
  const [character, dispatchCharacter] = useReducer(CharacterReducer, CharacterStateDefault());

  return (
    <CharacterSelectionContext.Provider value={character}>
      <CharacterSelectionDispatchContext.Provider value={dispatchCharacter}>
          {children}
      </CharacterSelectionDispatchContext.Provider>
    </CharacterSelectionContext.Provider>
  );
}

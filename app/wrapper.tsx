"use client";

import { BodyType } from "@prisma/client";
import React, { useReducer } from "react";
import { CharacterReducer } from "./character-selection-reducer";
import { CharacterSelectionContext, CharacterSelectionDispatchContext } from "./character-selection-context";

export default function AppWrapper(props: React.PropsWithChildren<{}>) {
  const {children} = props;

  const [character, dispatchCharacter] = useReducer(CharacterReducer, {
    BodyType: BodyType.Medium,
    Parts: {},
  });

  return (
    <CharacterSelectionContext.Provider value={character}>
      <CharacterSelectionDispatchContext.Provider value={dispatchCharacter}>
          {children}
      </CharacterSelectionDispatchContext.Provider>
    </CharacterSelectionContext.Provider>
  );
}

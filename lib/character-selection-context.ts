// "use client";

// import { Dispatch, createContext, useContext } from "react";
// import { CharacterAction, CharacterState } from './character-selection-reducer';

// export const CharacterStateDefault = () => ({
//   BodyType: "MediumHumanoid",
//   Parts: {
//     Body: null,
//     Eyes: null,
//     FaceAccessory: null,
//     FacialHair: null,
//     Hair: null,
//     Head: null,
//     HairAccessory: null,
//     LeftArm: null,
//     LeftLeg: null,
//     RightArm: null,
//     RightLeg: null,
//   },
//   VisibleTab: 'Body',
//   // TODO: Load this on first query
//   Layouts: [
//     {
//       partType: 'Body',
//       anchorX: 0,
//       anchorY: 0,
//     },
//     {
//       partType: 'Head',
//       anchorX: -2,
//       anchorY: -3,
//     },
//     {
//       partType: 'Hair',
//       anchorX: -2,
//       anchorY: -7,
//     },
//     {
//       partType: 'Eyes',
//       anchorX: -2,
//       anchorY: -7,
//     },
//     {
//       partType: 'LeftLeg',
//       anchorX: 0,
//       anchorY: 4,
//     },
//     {
//       partType: 'RightLeg',
//       anchorX: -2,
//       anchorY: 3,
//     },
//     {
//       partType: 'LeftArm',
//       anchorX: 3,
//       anchorY: -1,
//     },
//     {
//       partType: 'RightArm',
//       anchorX: -2,
//       anchorY: -1,
//     }
//   ],
// } as CharacterState)

// export const CharacterSelectionContext = createContext<CharacterState>(CharacterStateDefault());
// export const CharacterSelectionDispatchContext = createContext<Dispatch<CharacterAction>>(() => ({}));

// export const useCharacterContext = () => useContext(CharacterSelectionContext);
// export const useCharacterDispatchContext = () => useContext(CharacterSelectionDispatchContext);

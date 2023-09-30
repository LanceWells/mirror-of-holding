import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CharacterBodySlice from "./character-body";
import TreasureHaulSlice from "./treasure-haul";

const reducer = combineReducers({
  characterBody: CharacterBodySlice.reducer,
  treasureHaul: TreasureHaulSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

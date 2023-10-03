import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CharacterBodySlice from "./character-body";
import TreasureHaulSlice from "./treasure-haul";
import ChestHaulSlice from "./chest-haul";

const reducer = combineReducers({
  characterBody: CharacterBodySlice.reducer,
  treasureHaul: TreasureHaulSlice.reducer,
  chestHaul: ChestHaulSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

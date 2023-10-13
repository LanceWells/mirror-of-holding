import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CharacterBodySlice from "./character-body";
import TreasureHaulSlice from "./treasure-haul";
import ChestHaulSlice from "./chest-haul";
import UserSlice from "./user";

const reducer = combineReducers({
  characterBody: CharacterBodySlice.reducer,
  treasureHaul: TreasureHaulSlice.reducer,
  chestHaul: ChestHaulSlice.reducer,
  userState: UserSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

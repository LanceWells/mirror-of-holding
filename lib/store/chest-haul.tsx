import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TreasureHaulItem, TreasureHaulPayload } from "../treasurehaul/treasure-haul-payload";
import { ChestDrawerStates } from "../drawer-states";
import { useSelector } from "react-redux";

const DefaultChestHaul = {
  items: {} as TreasureHaulPayload['haul'],
  displayedItem: null as null | TreasureHaulItem,
  editorDrawerOpen: null as null | ChestDrawerStates,
}

export type ChestHaulStorage = typeof DefaultChestHaul;

const ChestHaulSlice = createSlice({
  name: 'chestHaul',
  initialState: DefaultChestHaul,
  reducers: {
    setDisplayedItem(state, action: PayloadAction<{ item: TreasureHaulItem }>) {
      state.displayedItem = action.payload.item;
    },
    setDrawerOpen(state, action: PayloadAction<ChestHaulStorage['editorDrawerOpen']>) {
      state.editorDrawerOpen = action.payload;
    },
  }
});

type ChestHaulStore = {
  chestHaul: ChestHaulStorage
}

const useDisplayedItemSelector = () =>
  useSelector<ChestHaulStore, ChestHaulStorage['displayedItem']>(
    createSelector(
      (state: ChestHaulStore) => state.chestHaul.displayedItem,
      (item) => item,
    )
  );

const useDrawerOpenSelector = () =>
  useSelector<ChestHaulStore, ChestHaulStorage['editorDrawerOpen']>(
    createSelector(
      (state: ChestHaulStore) => state.chestHaul.editorDrawerOpen,
      (open) => open,
    )
  );

export default ChestHaulSlice;

export const {
  setDisplayedItem,
  setDrawerOpen,
} = ChestHaulSlice.actions;

export {
  useDisplayedItemSelector,
  useDrawerOpenSelector,
};

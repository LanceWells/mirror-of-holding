import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TreasureHaulItem } from "../treasurehaul/treasure-haul-payload";

const DefaultTreasureHaul = {
  name: "",
  items: {} as {
    [P: string]: TreasureHaulItem
  },
  displayedItem: null as null | {
    item: TreasureHaulItem,
    itemKey: string,
  },
  editorDrawerOpen: null as null | "baseItem" | "details",
  baseItemSearch: ''
}

export type TreasureHaulStorage = typeof DefaultTreasureHaul;

const TreasureHaulSlice = createSlice({
  name: 'treasureHaul',
  initialState: DefaultTreasureHaul,
  reducers: {
    addItemToHaul(state, action: PayloadAction<{
      item: TreasureHaulItem,
    }>) {
      const item = action.payload.item;

      let itemIndex = 0;
      let itemKey = `${item.itemName}_${itemIndex}`;
      while (state.items[itemKey]) {
        itemKey = `${item.itemName}_${++itemIndex}`;
      }

      state.items[itemKey] = item;
      state.displayedItem = {
        item,
        itemKey,
      }
      console.debug("stalling")
    },
    removeItemFromHaul(state, action: PayloadAction<{ key: string }>) {
      delete state.items[action.payload.key];
    },
    updateItemInHaul(state, action: PayloadAction<{ key: string, item: TreasureHaulItem }>) {
      state.items[action.payload.key] = action.payload.item;
    },
    setDisplayedItem(state, action: PayloadAction<{ itemKey: string }>) {
      const thisItem = state.items[action.payload.itemKey];
      if (!thisItem) {
        state.displayedItem = null;
      } else {
        state.displayedItem = {
          item: thisItem,
          itemKey: action.payload.itemKey,
        }
      }
    },
    setEditorDrawerOpen(state, action: PayloadAction<TreasureHaulStorage['editorDrawerOpen']>) {
      state.editorDrawerOpen = action.payload;
    },
    setBuilderBaseItemSearch(state, action: PayloadAction<string>) {
      state.baseItemSearch = action.payload.toUpperCase();
    }
  },
});

const useHaulSelector = () =>
  useSelector<{ treasureHaul: TreasureHaulStorage }, [string, TreasureHaulItem][]>(
    createSelector(
      (state: { treasureHaul: TreasureHaulStorage }) => state.treasureHaul.items,
      (items) => Object.entries(items),
    )
  );

const useHaulNameSelector = () =>
  useSelector<{ treasureHaul: TreasureHaulStorage }, TreasureHaulStorage['name']>(
    (state) => state.treasureHaul.name
  );

const useDisplayedItemSelector = () =>
  useSelector<{ treasureHaul: TreasureHaulStorage }, TreasureHaulStorage['displayedItem']>(
    (state) => state.treasureHaul.displayedItem
  );

const useDrawerOpenSelector = () =>
  useSelector<{ treasureHaul: TreasureHaulStorage }, TreasureHaulStorage['editorDrawerOpen']>(
    (state) => state.treasureHaul.editorDrawerOpen
  )

const useSearchTermSelector = () =>
  useSelector<{ treasureHaul: TreasureHaulStorage }, TreasureHaulStorage['baseItemSearch']>(
    (state) => state.treasureHaul.baseItemSearch
  )

export default TreasureHaulSlice;

  export const {
    addItemToHaul,
    removeItemFromHaul,
    setDisplayedItem,
    updateItemInHaul,
    setEditorDrawerOpen,
    setBuilderBaseItemSearch,
  } = TreasureHaulSlice.actions;

  export {
    useHaulSelector,
    useHaulNameSelector,
    useDisplayedItemSelector,
    useDrawerOpenSelector,
    useSearchTermSelector,
    DefaultTreasureHaul,
  };

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TreasureHaulItem } from "../treasurehaul/treasure-haul-payload";
import { HaulBuilderDrawerStates } from "../drawer-states";
import { ToastEntry } from "@/components/toast/toast-types";
import { ChestIconOptions } from "@/components/chestDetails/chest-details-options";

const DefaultTreasureHaul = {
  name: "",
  items: {} as {
    [P: string]: TreasureHaulItem
  },
  displayedItem: null as null | {
    item: TreasureHaulItem,
    itemKey: string,
  },
  editorDrawerOpen: null as null | HaulBuilderDrawerStates,
  baseItemSearch: '',
  toasts: [] as [string, ToastEntry][],
  chestDetails: {
    chestName: 'A mysterious chest',
    chestIconOption: 'chest' as ChestIconOptions,
    chestIconURL: ChestIconOptions['chest'] as string,
  }
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
    setDrawerOpen(state, action: PayloadAction<TreasureHaulStorage['editorDrawerOpen']>) {
      state.editorDrawerOpen = action.payload;
    },
    setBuilderBaseItemSearch(state, action: PayloadAction<string>) {
      state.baseItemSearch = action.payload.toUpperCase();
    },
    setToast(state, action: PayloadAction<ToastEntry>) {
      let newToast: ToastEntry = {
        duration: action.payload.duration,
        icon: action.payload.icon,
        text: action.payload.text,
        url: action.payload.url,
      };

      const toastKey = Math.random().toString();
      state.toasts.push([toastKey, newToast]);
    },
    removeToast(state, action: PayloadAction<{ toastKey: string }>) {
      const removeIndex = state.toasts.findIndex((t) => t[0] === action.payload.toastKey);
      if (removeIndex >= 0) {
        state.toasts.splice(removeIndex, 1);
      }
    },
    setChestDetails(state, action: PayloadAction<TreasureHaulStorage['chestDetails']>) {
      state.chestDetails.chestIconURL = action.payload.chestIconURL;
      state.chestDetails.chestIconOption = action.payload.chestIconOption;
      state.chestDetails.chestName = action.payload.chestName;
    }
  },
});

type HaulStore = {
  treasureHaul: TreasureHaulStorage;
}

const useHaulSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['items']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.items,
      (items) => items,
    )
  );

const useHaulNameSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['name']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.name,
      (name) => name,
    )
  );

const useDisplayedItemSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['displayedItem']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.displayedItem,
      (item) => item,
    )
  )

const useDrawerOpenSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['editorDrawerOpen']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.editorDrawerOpen,
      (open) => open,
    )
  )

const useSearchTermSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['baseItemSearch']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.baseItemSearch,
      (search) => search,
    )
  )

const useToastSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['toasts']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.toasts,
      (toasts) => toasts,
    )
  )

const useChestDetailsSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['chestDetails']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.chestDetails,
      (details) => details,
    )
  )

export default TreasureHaulSlice;

export const {
  addItemToHaul,
  removeItemFromHaul,
  setDisplayedItem,
  updateItemInHaul,
  setDrawerOpen,
  setBuilderBaseItemSearch,
  setToast,
  removeToast,
  setChestDetails,
} = TreasureHaulSlice.actions;

export {
  useHaulSelector,
  useHaulNameSelector,
  useDisplayedItemSelector,
  useDrawerOpenSelector,
  useSearchTermSelector,
  useToastSelector,
  useChestDetailsSelector,
  DefaultTreasureHaul,
};

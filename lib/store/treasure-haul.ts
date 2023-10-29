import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TreasureHaulItem } from '../treasurehaul/treasure-haul-payload';
import { HaulBuilderDrawerStates } from '../drawer-states';
import { ToastEntry } from '@/components/toast/toast-types';
import { ChestIconOptions } from '@/components/chestDetails/chest-details-options';
import { BaseItemType, ItemTag } from '@prisma/client';

const TagSearchTypes = {
  Tag: 'Tag',
};

const DefaultTreasureHaul = {
  name: '',
  items: {} as {
    [P: string]: TreasureHaulItem
  },
  displayedItem: null as null | {
    item: TreasureHaulItem,
    itemKey: string,
  },
  editorDrawerOpen: null as null | HaulBuilderDrawerStates,
  baseItemSearch: [] as (
    | { type: 'tag', tag: ItemTag }
    | { type: 'name', name: string }
    | { type: 'itemType', itemType: BaseItemType }
  )[],
  toasts: [] as [string, ToastEntry][],
  chestDetails: {
    chestName: 'A mysterious chest',
    chestIconOption: 'chest' as ChestIconOptions,
    chestIconURL: ChestIconOptions['chest'] as string,
  },
  cardVisiblity: [] as string[],
};

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
      };
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
        };
      }
    },
    setDrawerOpen(state, action: PayloadAction<TreasureHaulStorage['editorDrawerOpen']>) {
      state.editorDrawerOpen = action.payload;
    },
    setBuilderBaseItemSearch(state, action: PayloadAction<TreasureHaulStorage['baseItemSearch']>) {
      state.baseItemSearch = action.payload;
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
    },
    setCardVisibility(state, action: PayloadAction<{ itemKey: string }>) {
      // state.cardVisiblity[action.payload.canvasKey] = {
      //   itemKey: action.payload.itemKey,
      // };

      const s = new Set(state.cardVisiblity);
      s.add(action.payload.itemKey);
      state.cardVisiblity = [...s.values()];
    },
    removeCardVisibility(state, action: PayloadAction<{ itemKey: string }>) {
      // delete state.cardVisiblity[action.payload.canvasKey];

      const s = new Set(state.cardVisiblity);
      s.delete(action.payload.itemKey);
      state.cardVisiblity = [...s.values()];
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
  );

const useDrawerOpenSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['editorDrawerOpen']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.editorDrawerOpen,
      (open) => open,
    )
  );

const useSearchTermSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['baseItemSearch']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.baseItemSearch,
      (search) => search,
    )
  );

const useToastSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['toasts']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.toasts,
      (toasts) => toasts,
    )
  );

const useChestDetailsSelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['chestDetails']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.chestDetails,
      (details) => details,
    )
  );

const useCardVisibilitySelector = () =>
  useSelector<HaulStore, TreasureHaulStorage['cardVisiblity']>(
    createSelector(
      (state: HaulStore) => state.treasureHaul.cardVisiblity,
      (cardVisiblity) => cardVisiblity,
    )
  );

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
  setCardVisibility,
  removeCardVisibility,
} = TreasureHaulSlice.actions;

export {
  useHaulSelector,
  useHaulNameSelector,
  useDisplayedItemSelector,
  useDrawerOpenSelector,
  useSearchTermSelector,
  useToastSelector,
  useChestDetailsSelector,
  useCardVisibilitySelector,
  DefaultTreasureHaul,
};

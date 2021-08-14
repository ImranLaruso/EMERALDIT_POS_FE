import { createSelector } from 'reselect';

const selectItem = state => state.item;

export const selectItemList = createSelector(selectItem, item => item.itemList);

export const selectFormattedItemList = createSelector(
  selectItem,
  item => item.formattedItemList
);

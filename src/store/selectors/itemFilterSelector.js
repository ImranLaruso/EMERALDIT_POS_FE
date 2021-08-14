import { createSelector } from 'reselect';

const selectItemFilter = state => state.itemFilter;

export const selectSearchValue = createSelector(
  selectItemFilter,
  itemFilter => itemFilter.searchValue
);

export const selectSearchType = createSelector(
  selectItemFilter,
  itemFilter => itemFilter.searchType
);

export const selectIsBranded = createSelector(
  selectItemFilter,
  itemFilter => itemFilter.isBranded
);

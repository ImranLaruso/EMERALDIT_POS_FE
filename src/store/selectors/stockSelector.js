import { createSelector } from 'reselect';

const selectStock = state => state.stock;

export const selectAllStockList = createSelector(
  selectStock,
  stock => stock.allStockList
);

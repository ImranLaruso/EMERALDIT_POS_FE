import { createSelector } from 'reselect';

const selectBrand = state => state.brand;

export const selectAllBrandList = createSelector(
  selectBrand,
  brand => brand.allBrandList
);

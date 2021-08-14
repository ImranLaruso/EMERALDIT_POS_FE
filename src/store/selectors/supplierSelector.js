import { createSelector } from 'reselect';

const selectSupplier = state => state.supplier;

export const selectAllSupplierList = createSelector(
  selectSupplier,
  supplier => supplier.allSupplierList
);

export const selectSupplierList = createSelector(
  selectSupplier,
  supplier => supplier.supplierList
);

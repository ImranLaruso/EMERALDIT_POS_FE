import { createSelector } from 'reselect';

const selectSale = state => state.sale;

const selectSaleCartItems = createSelector(selectSale, sale => sale.cartItems);

const selectSaleCustomer = createSelector(selectSale, sale => sale.customer);

const selectSalePaymentMethod = createSelector(
  selectSale,
  sale => sale.paymentMethod
);

export { selectSaleCartItems, selectSaleCustomer, selectSalePaymentMethod };

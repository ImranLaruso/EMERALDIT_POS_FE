import { createSelector } from 'reselect';

const selectReceive = state => state.receive;

const selectReceiveCartItems = createSelector(
  selectReceive,
  receive => receive.cartItems
);

const selectReceiveSupplier = createSelector(
  selectReceive,
  receive => receive.customer
);

const selectReceivePaymentMethod = createSelector(
  selectReceive,
  receive => receive.paymentMethod
);

export {
  selectReceiveCartItems,
  selectReceiveSupplier,
  selectReceivePaymentMethod,
};

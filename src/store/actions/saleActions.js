import {
  SET_SALE_CART,
  SET_SALE_CUSTOMER,
  SET_SALE_PAYMENT_METHOD,
} from './actionTypes';

export const setSaleCartItems = payload => dispatch =>
  dispatch({
    type: SET_SALE_CART,
    payload,
  });

export const setSaleCustomer = payload => dispatch =>
  dispatch({
    type: SET_SALE_CUSTOMER,
    payload,
  });

export const setSalePaymentMethod = payload => dispatch =>
  dispatch({
    type: SET_SALE_PAYMENT_METHOD,
    payload,
  });

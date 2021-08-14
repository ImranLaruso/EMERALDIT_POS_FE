import {
  SET_RECEIVE_CART,
  SET_RECEIVE_PAYMENT_METHOD,
  SET_RECEIVE_SUPPLIER,
} from './actionTypes';

export const setReceiveCartItems = payload => dispatch =>
  dispatch({
    type: SET_RECEIVE_CART,
    payload,
  });

export const setReceiveSupplier = payload => dispatch =>
  dispatch({
    type: SET_RECEIVE_SUPPLIER,
    payload,
  });

export const setReceivePaymentMethod = payload => dispatch =>
  dispatch({
    type: SET_RECEIVE_PAYMENT_METHOD,
    payload,
  });

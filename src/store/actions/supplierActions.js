import * as ACTION_TYPES from './actionTypes';

export const setSupplierList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_SUPPLIER_LIST,
    payload,
  });

export const setAllSupplierList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_ALL_SUPPLIER_LIST,
    payload,
  });

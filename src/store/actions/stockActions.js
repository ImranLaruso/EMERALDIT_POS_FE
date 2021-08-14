import * as ACTION_TYPES from './actionTypes';

export const setStockList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_ALL_STOCK_LIST,
    payload,
  });

import * as ACTION_TYPES from './actionTypes';

export const setBrandList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_ALL_BRAND_LIST,
    payload,
  });

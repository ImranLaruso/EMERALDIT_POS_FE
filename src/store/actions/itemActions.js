import * as ACTION_TYPES from './actionTypes';

export const setItemList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_ITEM_LIST,
    payload,
  });

export const setFormattedList = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_FORMATTED_ITEM_LIST,
    payload,
  });

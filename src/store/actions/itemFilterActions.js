import * as ACTION_TYPES from './actionTypes';

export const setSearchValue = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_SEARCH_VALUE,
    payload,
  });

export const setSearchType = payload => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_SEARCH_TYPE,
    payload,
  });

export const setIsBranded = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.SET_IS_BRANDED,
  });

import * as ACTION_TYPES from '../actions/actionTypes';

const INITIAL_STATE = {
  searchValue: '',
  searchType: 'itemCode',
  isBranded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };

    case ACTION_TYPES.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };

    case ACTION_TYPES.SET_IS_BRANDED:
      return {
        ...state,
        isBranded: !state.isBranded,
      };

    default:
      return state;
  }
};

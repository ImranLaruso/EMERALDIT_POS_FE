import * as ACTION_TYPES from '../actions/actionTypes';

const INITIAL_STATE = {
  allBrandList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_BRAND_LIST:
      return {
        ...state,
        allBrandList: action.payload,
      };

    default: {
      return state;
    }
  }
};

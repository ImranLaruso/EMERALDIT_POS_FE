import { DATA_FETCHING, DATA_FETCHING_ERR } from '../actions/actionTypes';

export default (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case DATA_FETCHING:
      newState.isFetching = action.payload;
      break;
    case DATA_FETCHING_ERR:
      newState.messageInfo = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};

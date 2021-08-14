import { DATA_FETCHING, DATA_FETCHING_ERR } from './actionTypes';

export const fetchApi = isFetching => dispatch =>
  dispatch({
    type: DATA_FETCHING,
    payload: isFetching,
  });

export const setFetchApiInfo = info => dispatch =>
  dispatch({
    type: DATA_FETCHING_ERR,
    payload: info || {},
  });

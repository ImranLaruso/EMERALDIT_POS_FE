import {
  LOAD_AUTH_DATA,
  AUTHENTICATION,
  LOGOUT,
  SET_ERROR_NOTIFICATION,
  SET_AUTH_LOADING,
  SET_LOGIN_ERROR_FALSE
} from './actionTypes';
import errorMessages from '../../utilities/errorMessages';
import { AUTH_LOCAL_STORAGE } from '../../utilities/constants';
import { sendAuthData } from '../../http/authApi';

export const setPersistentData = authData => dispatch => {
  if (authData && authData.token) {
    dispatch({ type: LOAD_AUTH_DATA, payload: authData });
  } else {
    dispatch({ type: LOGOUT });
  }
};

export const authenticate = ({ employeeId, password }) => dispatch => {
  const handleSendAuthDataResp = resp => {
    if (resp.data !== null && typeof resp.data === 'object') {
      console.log(resp.data);
      dispatch([
        {
          type: AUTHENTICATION,
          payload: { employeeId, token: resp.data.token }
        },
        { type: SET_AUTH_LOADING, payload: false }
      ]);
    }
  };

  const handleSendAuthDataError = errResp => {
    console.log(errResp);
    dispatch([
      {
        type: SET_ERROR_NOTIFICATION,
        payload: errorMessages.loginFail
      },
      { type: SET_AUTH_LOADING, payload: false }
    ]);
  };

  dispatch({ type: SET_AUTH_LOADING, payload: true });

  sendAuthData({ employeeId: employeeId, password })
    .then(handleSendAuthDataResp)
    .catch(handleSendAuthDataError);
};

export const setLoginErrorFalse = () => dispatch => {
  dispatch({
    type: SET_LOGIN_ERROR_FALSE
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem(AUTH_LOCAL_STORAGE);
  dispatch({ type: LOGOUT });
};

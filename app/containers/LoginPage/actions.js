import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
  REQUEST_LOGOUT,
  SUCCESS_LOGOUT,
  FAILED_LOGOUT,
} from './constants';

export const requestLogin = user => ({
  type: REQUEST_LOGIN,
  payload: user,
});

export const loginSuccess = payload => ({
  type: SUCCESS_LOGIN,
  payload,
});

export const loginFailed = error => ({
  type: FAILED_LOGIN,
  payload: error,
});
export const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});

export const logoutSuccess = () => ({
  type: SUCCESS_LOGOUT,
});

export const logoutFailed = () => ({
  type: FAILED_LOGOUT,
});

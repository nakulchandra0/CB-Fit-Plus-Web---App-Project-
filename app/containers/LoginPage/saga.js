/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_LOGIN, REQUEST_LOGOUT } from './constants';
import {
  loginSuccess,
  loginFailed,
  logoutFailed,
  logoutSuccess,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
/**
 * Github repos request/response handler
 */
export function* login({ payload }) {
  const requestURL = `${API_URL}/users/signin`;
  try {
    // Call our request helper (see 'utils/request')
    const newUser = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    const { data } = newUser;
    if (!data.success || data.error) {
      yield put(loginFailed(data.message));
    } else {
      sessionStorage.setItem('userToken', data.token);
      const authenticUser = {
        ...newUser.data,
        isAuthenticated: true,
      };
      yield put(loginSuccess(authenticUser));
    }
  } catch (err) {
    yield put(loginFailed('Username or Password is wrong, Please check again'));
  }
}

export function* logout() {
  try {
    sessionStorage.removeItem('userToken');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailed());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  yield takeLatest(REQUEST_LOGIN, login);
  yield takeLatest(REQUEST_LOGOUT, logout);
}

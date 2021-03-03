/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_REGISTER, REQUEST_VERIFY_OTP } from './constants';
import {
  RegisterSuccess,
  RegisterFailed,
  VerifyOtpFailed,
  VerifyOtpSuccess,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
/**
 * Github repos request/response handler
 */
export function* registration({ payload }) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `${API_URL}/users/signup`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });

    if (response.status === 200) {
      yield put(RegisterSuccess(response.data.success));
    } else if (response.status === 400) {
      yield put(RegisterFailed(response.data.message));
    }
  } catch (err) {
    yield put(RegisterFailed('Please check again'));
  }
}

export function* handleVerifyOTP({ payload }) {
  const requestURL = `${API_URL}/users/verifyOtp`;
  try {
    const newUser = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    if (newUser.data) {
      yield put(VerifyOtpSuccess(newUser.data));
    }
  } catch (err) {
    yield put(VerifyOtpFailed('OTP Invalid Please Try Again'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  yield takeLatest(REQUEST_REGISTER, registration);
  yield takeLatest(REQUEST_VERIFY_OTP, handleVerifyOTP);
}

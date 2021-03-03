import {
  REQUEST_USER,
  SUCCESS_USER,
  FAILED_USER,
  REQUEST_ADD_USER,
  SUCCESS_ADD_USER,
  FAILED_ADD_USER,
  REQUEST_USER_BY_ID,
  SUCCESS_USER_BY_ID,
  FAILED_USER_BY_ID,
  REQUEST_DELETE_USER,
  SUCCESS_DELETE_USER,
  FAILED_DELETE_USER,
  REQUEST_CLASS,
  SUCCESS_CLASS,
  FAILED_CLASS,
  REQUEST_STATE,
  SUCCESS_STATE,
  FAILED_STATE,
  REQUEST_COUNTRY_BY_ID,
  SUCCESS_COUNTRY_BY_ID,
  FAILED_COUNTRY_BY_ID,
  REQUEST_ADD_COUNTRY,
  SUCCESS_ADD_COUNTRY,
  FAILED_ADD_COUNTRY,
  REQUEST_BOOK_CLASS,
  SUCCESS_BOOK_CLASS,
  FAILED_BOOK_CLASS,
  REQUEST_COMPLETED_CLASS,
  SUCCESS_COMPLETED_CLASS,
  FAILED_COMPLETED_CLASS,
  REQUEST_DEACTIVE_CLASS,
  SUCCESS_DEACTIVE_CLASS,
  FAILED_DEACTIVE_CLASS,
} from './constants';

export const requestUser = user => ({
  type: REQUEST_USER,
  payload: user,
});

export const userSuccess = payload => ({
  type: SUCCESS_USER,
  payload,
});

export const userFailed = error => ({
  type: FAILED_USER,
  payload: error,
});

export const requestUserById = user => ({
  type: REQUEST_USER_BY_ID,
  payload: user,
});

export const userByIdSuccess = payload => ({
  type: SUCCESS_USER_BY_ID,
  payload,
});

export const userByIdFailed = error => ({
  type: FAILED_USER_BY_ID,
  payload: error,
});

export const requestAddUser = payload => ({
  type: REQUEST_ADD_USER,
  payload,
});

export const addUserSuccess = payload => ({
  type: SUCCESS_ADD_USER,
  payload,
});

export const addUserFailed = payload => ({
  type: FAILED_ADD_USER,
  payload,
});

export const requestState = state => ({
  type: REQUEST_STATE,
  payload: state,
});

export const stateSuccess = payload => ({
  type: SUCCESS_STATE,
  payload,
});

export const stateFailed = error => ({
  type: FAILED_STATE,
  payload: error,
});

export const requestCountryById = country => ({
  type: REQUEST_COUNTRY_BY_ID,
  payload: country,
});

export const countryByIdSuccess = payload => ({
  type: SUCCESS_COUNTRY_BY_ID,
  payload,
});

export const countryByIdFailed = error => ({
  type: FAILED_COUNTRY_BY_ID,
  payload: error,
});

export const requestAddCountry = payload => ({
  type: REQUEST_ADD_COUNTRY,
  payload,
});

export const addCountrySuccess = payload => ({
  type: SUCCESS_ADD_COUNTRY,
  payload,
});

export const addCountryFailed = payload => ({
  type: FAILED_ADD_COUNTRY,
  payload,
});

export const requestDeleteUser = payload => ({
  type: REQUEST_DELETE_USER,
  payload,
});

export const deleteUserSuccess = payload => ({
  type: SUCCESS_DELETE_USER,
  payload,
});

export const deleteUserFailed = error => ({
  type: FAILED_DELETE_USER,
  payload: error,
});

export const requestClass = user => ({
  type: REQUEST_CLASS,
  payload: user,
});

export const classSuccess = payload => ({
  type: SUCCESS_CLASS,
  payload,
});

export const classFailed = error => ({
  type: FAILED_CLASS,
  payload: error,
});

export const requestBookClass = user => ({
  type: REQUEST_BOOK_CLASS,
  payload: user,
});

export const bookClassSuccess = payload => ({
  type: SUCCESS_BOOK_CLASS,
  payload,
});

export const bookClassFailed = error => ({
  type: FAILED_BOOK_CLASS,
  payload: error,
});

export const requestCompletedClass = user => ({
  type: REQUEST_COMPLETED_CLASS,
  payload: user,
});

export const completedClassSuccess = payload => ({
  type: SUCCESS_COMPLETED_CLASS,
  payload,
});

export const completedClassFailed = error => ({
  type: FAILED_COMPLETED_CLASS,
  payload: error,
});
export const requestDeactiveClass = payload => ({
  type: REQUEST_DEACTIVE_CLASS,
  payload,
});

export const deactiveClassSuccess = payload => ({
  type: SUCCESS_DEACTIVE_CLASS,
  payload,
});

export const deactiveClassFailed = error => ({
  type: FAILED_DEACTIVE_CLASS,
  payload: error,
});

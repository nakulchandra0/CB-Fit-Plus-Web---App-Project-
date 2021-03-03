import { put, takeLatest, fork, all } from 'redux-saga/effects';
import request from 'utils/request';
import { get } from 'lodash';
import {
  REQUEST_USER,
  REQUEST_ADD_USER,
  REQUEST_USER_BY_ID,
  REQUEST_STATE,
  REQUEST_CLASS,
  REQUEST_DELETE_USER,
  REQUEST_BOOK_CLASS,
  REQUEST_COMPLETED_CLASS,
  REQUEST_DEACTIVE_CLASS,
} from './constants';
import classSaga from '../ClassPage/saga';

import {
  userSuccess,
  userFailed,
  addUserFailed,
  addUserSuccess,
  userByIdSuccess,
  userByIdFailed,
  stateSuccess,
  stateFailed,
  deleteUserSuccess,
  deleteUserFailed,
  classSuccess,
  classFailed,
  bookClassSuccess,
  bookClassFailed,
  completedClassSuccess,
  completedClassFailed,
  deactiveClassSuccess,
  deactiveClassFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* user({ payload }) {
  const {
    id,
    name,
    email,
    phone,
    gender,
    subscriptionType,
    page,
    limit,
  } = payload;
  let url = '';
  if (id || name || email || phone || gender || subscriptionType) {
    url = `&id=${id}&name=${name}&email=${email}&phone=${phone}&gender=${gender}&subscriptionType=${subscriptionType}&page=${page}&limit=${limit}`;
  } else if (page || limit) {
    url = `&page=${page}&limit=${limit}`;
  }
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/getAllUsers?role=USER${url}`;
  try {
    const usersList = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: payload,
    });
    if (usersList) {
      yield put(userSuccess(usersList.data));
    }
  } catch (err) {
    yield put(userFailed(err));
  }
}

export function* userById({ payload }) {
  const id = (payload && `?_id=${payload}`) || '';
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/viewUser/${payload.userId}`;
  try {
    const stores = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: id,
    });
    const { data } = stores;
    yield put(userByIdSuccess(data));
  } catch (error) {
    yield put(userByIdFailed(error));
  }
}

export function* addUser(payload) {
  const payloadData = payload.payload;
  const { editUserId, formData } = payloadData;
  let url = '';
  if (editUserId) {
    url = `?id=${editUserId}`;
  }

  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/addData${url}`;
  try {
    const userList = yield request({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
      },
      url: requestURL,
      data: formData,
    });
    const { data } = userList;
    yield put(addUserSuccess(data));
  } catch (error) {
    yield put(addUserFailed(error));
  }
}

export function* state({ payload }) {
  const id = (payload && `?_id=${payload}`) || '';
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/getState?isocode3=BLR`;
  try {
    const stateList = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: id,
    });
    if (stateList) {
      yield put(stateSuccess(stateList.data));
    }
  } catch (err) {
    yield put(stateFailed(err));
  }
}

export function* deleteById({ payload }) {
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/deleteUser`;
  try {
    const deleteUser = yield request({
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: payload,
    });
    if (deleteUser) {
      yield put(deleteUserSuccess(deleteUser));
    }
  } catch (err) {
    yield put(deleteUserFailed(err));
  }
}

export function* requestClass({ payload }) {
  // const { page, limit } = payload;
  const id = (payload && `?_id=${payload}`) || '';
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/viewuserClass/${payload.userId}`;
  try {
    const viewUser = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: id,
    });
    const { data } = viewUser;
    yield put(classSuccess(data));
  } catch (error) {
    yield put(classFailed(error));
  }
}

export function* requestBookClass({ payload }) {
  const id = (payload && `?_id=${payload}`) || '';
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/viewuserClass/${
    payload.userId
  }?bookClass=true`;
  try {
    const viewUser = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: id,
    });
    const { data } = viewUser;
    yield put(bookClassSuccess(data));
  } catch (error) {
    yield put(bookClassFailed(error));
  }
}

export function* requestCompletedClass({ payload }) {
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);

  const id = (payload && `?_id=${payload}`) || '';
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/viewuserClass/${
    payload.userId
  }?completedClass=true&page=${page}&limit=${limit}`;
  try {
    const viewUser = yield request({
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: requestURL,
      data: id,
    });
    const { data } = viewUser;
    yield put(completedClassSuccess(data));
  } catch (error) {
    yield put(completedClassFailed(error));
  }
}
export function* deactiveById(payload) {
  const payloadData = payload.payload;
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/isActive`;
  try {
    const optionsList = yield request({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payloadData,
      url: requestURL,
    });
    const { data } = optionsList;
    yield put(deactiveClassSuccess(data));
  } catch (error) {
    yield put(deactiveClassFailed(error));
  }
}

function* userData() {
  yield takeLatest(REQUEST_USER, user);
  yield takeLatest(REQUEST_USER_BY_ID, userById);
  yield takeLatest(REQUEST_ADD_USER, addUser);
  yield takeLatest(REQUEST_STATE, state);
  yield takeLatest(REQUEST_CLASS, requestClass);
  yield takeLatest(REQUEST_BOOK_CLASS, requestBookClass);
  yield takeLatest(REQUEST_DELETE_USER, deleteById);
  yield takeLatest(REQUEST_COMPLETED_CLASS, requestCompletedClass);
  yield takeLatest(REQUEST_DEACTIVE_CLASS, deactiveById);
}

export default function* rootSaga() {
  yield all([fork(userData), fork(classSaga)]);
}

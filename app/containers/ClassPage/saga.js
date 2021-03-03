/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  REQUEST_CLASS,
  REQUEST_ADD_CLASS,
  REQUEST_VIEW_CLASS,
  REQUEST_ALL_INSTRUCTOR,
  REQUEST_DELETE_CLASS,
  REQUEST_FEATURED_CLASS,
} from './constants';
import {
  classSuccess,
  classFailed,
  addClassSuccess,
  addClassFailed,
  viewClassSuccess,
  viewClassFailed,
  instructorFailed,
  instructorSuccess,
  deleteClassSuccess,
  deleteClassFailed,
  featuredClassSuccess,
  featuredClassFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
/**
 * Github repos request/response handler
 */
export function* requestClass({ payload }) {
  const {
    page,
    limit,
    userId,
    instructorName,
    date,
    recordingDate,
    danceClassType,
    difficulty,
    classType,
    duration,
  } = payload;
  let url = '';
  if (userId) {
    url = `?id=${userId}`;
  } else if (
    date ||
    instructorName ||
    recordingDate ||
    danceClassType ||
    difficulty ||
    classType ||
    duration
  ) {
    url = `?date=${date}&instructorName=${instructorName}&recordingDate=${recordingDate}&danceClassType=${danceClassType}&difficulty=${difficulty}&classType=${classType}&duration=${duration}&page=${page}&limit=${limit}`;
  } else if (page || limit) {
    url = `?page=${page}&limit=${limit}`;
  }

  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/classes${url}`;
  try {
    const userList = yield request({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
      data: payload,
    });
    const { data } = userList;
    yield put(classSuccess(data));
  } catch (error) {
    yield put(classFailed(error));
  }
}
export function* ViewClass({ payload }) {
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/class/${payload.classId}`;
  try {
    const userList = yield request({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
      data: payload,
    });
    const { data } = userList;
    yield put(viewClassSuccess(data));
  } catch (error) {
    yield put(viewClassFailed(error));
  }
}
export function* addClass(payload) {
  const payloadData = payload.payload;
  const { editclassId, formData } = payloadData;
  let url = '';
  if (editclassId) {
    url = `?id=${editclassId}`;
  }

  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/classes/postClass/${url}`;
  try {
    const optionsList = yield request({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
      },
      url: requestURL,
      data: formData,
    });
    const { data } = optionsList;
    yield put(addClassSuccess(data));
  } catch (error) {
    yield put(addClassFailed(error));
  }
}

export function* AllInstructor({ payload }) {
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/getAllInstructor`;
  try {
    const userList = yield request({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
      data: payload,
    });
    const { data } = userList;
    yield put(instructorSuccess(data));
  } catch (error) {
    yield put(instructorFailed(error));
  }
}

export function* deleteById(payload) {
  const payloadData = payload.payload;
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/removeClass?id=${payloadData}`;
  try {
    const optionsList = yield request({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
    });
    const { data } = optionsList;
    yield put(deleteClassSuccess(data));
  } catch (error) {
    yield put(deleteClassFailed(error));
  }
}

export function* featuredById(payload) {
  const payloadData = payload.payload;
  const { id } = payloadData;
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/featuredClass?id=${id}`;
  try {
    const optionsList = yield request({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
    });
    const { data } = optionsList;
    yield put(featuredClassSuccess(data));
  } catch (error) {
    yield put(featuredClassFailed(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  yield takeLatest(REQUEST_CLASS, requestClass);
  yield takeLatest(REQUEST_ADD_CLASS, addClass);
  yield takeLatest(REQUEST_VIEW_CLASS, ViewClass);
  yield takeLatest(REQUEST_ALL_INSTRUCTOR, AllInstructor);
  yield takeLatest(REQUEST_DELETE_CLASS, deleteById);
  yield takeLatest(REQUEST_FEATURED_CLASS, featuredById);
}

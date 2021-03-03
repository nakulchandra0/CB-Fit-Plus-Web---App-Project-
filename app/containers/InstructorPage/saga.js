/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  REQUEST_INSTRUCTOR,
  REQUEST_ADD_INSTRUCTOR,
  REQUEST_VIEW_INSTRUCTOR,
  REQUEST_DELETE_INSTRUCTOR,
  REQUEST_INSTRUCTOR_CLASS,
} from './constants';
import {
  instructorSuccess,
  instructorFailed,
  addInstructorSuccess,
  addInstructorFailed,
  viewInstructorSuccess,
  viewInstructorFailed,
  deleteInstructorSuccess,
  deleteInstructorFailed,
  instructorClassSuccess,
  instructorClassFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
/**
 * Github repos request/response handler
 */
export function* instructor({ payload }) {
  const { id, name, email, phone, gender, status, page, limit } = payload;
  let url = '';
  if (id || name || email || phone || gender || status) {
    url = `&id=${id}&name=${name}&email=${email}&phone=${phone}&gender=${gender}&isActive=${status}&page=${page}&limit=${limit}`;
  } else if (page || limit) {
    url = `&page=${page}&limit=${limit}`;
  }
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/getAllUsers?role=INSTRUCTOR${url}`;
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

export function* viewInstructor({ payload }) {
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/viewUser/${payload.userId}`;
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
    yield put(viewInstructorSuccess(data));
  } catch (error) {
    yield put(viewInstructorFailed(error));
  }
}

export function* instructorClass({ payload }) {
  const token = sessionStorage.getItem('userToken');

  const {
    userId,
    date,
    recordingDate,
    danceClassType,
    difficulty,
    classType,
    duration,
    page,
    limit,
  } = payload;
  let url = '';
  if (
    date ||
    recordingDate ||
    danceClassType ||
    difficulty ||
    classType ||
    duration
  ) {
    const search = {
      date: date || null,
      recordingDate: recordingDate || null,
      danceClassType: danceClassType || null,
      difficulty: difficulty || null,
      classType: classType || null,
      duration: duration || null,
    };
    url = `&search=${JSON.stringify(search)}&page=${page}&limit=${limit}`;
  } else if (page || limit) {
    url = `&page=${page}&limit=${limit}`;
  }

  const requestURL = `${API_URL}/admin/viewuserClass/${userId}?instructor=true${url}`;
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
    yield put(instructorClassSuccess(data));
  } catch (error) {
    yield put(instructorClassFailed(error));
  }
}

export function* addInstructor(payload) {
  const payloadData = payload.payload;
  const { editUserId, formData } = payloadData;
  let url = '';
  if (editUserId) {
    url = `?id=${editUserId}`;
  }
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/addData${url}`;
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
    yield put(addInstructorSuccess(data));
  } catch (error) {
    yield put(addInstructorFailed(error));
  }
}

export function* deleteInstructor(payload) {
  const payloadData = payload.payload;
  const token = sessionStorage.getItem('userToken');
  const requestURL = `${API_URL}/admin/deleteUser`;
  try {
    const optionsList = yield request({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: requestURL,
      data: payloadData,
    });
    const { data } = optionsList;
    yield put(deleteInstructorSuccess(data));
  } catch (error) {
    yield put(deleteInstructorFailed(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  yield takeLatest(REQUEST_INSTRUCTOR, instructor);
  yield takeLatest(REQUEST_ADD_INSTRUCTOR, addInstructor);
  yield takeLatest(REQUEST_DELETE_INSTRUCTOR, deleteInstructor);
  yield takeLatest(REQUEST_VIEW_INSTRUCTOR, viewInstructor);
  yield takeLatest(REQUEST_INSTRUCTOR_CLASS, instructorClass);
}

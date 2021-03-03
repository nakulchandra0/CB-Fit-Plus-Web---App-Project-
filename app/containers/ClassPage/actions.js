import {
  REQUEST_CLASS,
  SUCCESS_CLASS,
  FAILED_CLASS,
  REQUEST_ADD_CLASS,
  SUCCESS_ADD_CLASS,
  FAILED_ADD_CLASS,
  REQUEST_VIEW_CLASS,
  SUCCESS_VIEW_CLASS,
  FAILED_VIEW_CLASS,
  REQUEST_ALL_INSTRUCTOR,
  SUCCESS_ALL_INSTRUCTOR,
  FAILED_ALL_INSTRUCTOR,
  REQUEST_DELETE_CLASS,
  SUCCESS_DELETE_CLASS,
  FAILED_DELETE_CLASS,
  REQUEST_FEATURED_CLASS,
  SUCCESS_FEATURED_CLASS,
  FAILED_FEATURED_CLASS,
} from './constants';

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

export const requestAddClass = user => ({
  type: REQUEST_ADD_CLASS,
  payload: user,
});

export const addClassSuccess = payload => ({
  type: SUCCESS_ADD_CLASS,
  payload,
});

export const addClassFailed = error => ({
  type: FAILED_ADD_CLASS,
  payload: error,
});

export const requestViewClass = user => ({
  type: REQUEST_VIEW_CLASS,
  payload: user,
});

export const viewClassSuccess = payload => ({
  type: SUCCESS_VIEW_CLASS,
  payload,
});

export const viewClassFailed = error => ({
  type: FAILED_VIEW_CLASS,
  payload: error,
});

export const requestInstructor = instructor => ({
  type: REQUEST_ALL_INSTRUCTOR,
  payload: instructor,
});

export const instructorSuccess = payload => ({
  type: SUCCESS_ALL_INSTRUCTOR,
  payload,
});

export const instructorFailed = error => ({
  type: FAILED_ALL_INSTRUCTOR,
  payload: error,
});
export const requestDeleteClass = payload => ({
  type: REQUEST_DELETE_CLASS,
  payload,
});

export const deleteClassSuccess = payload => ({
  type: SUCCESS_DELETE_CLASS,
  payload,
});

export const deleteClassFailed = error => ({
  type: FAILED_DELETE_CLASS,
  payload: error,
});
export const requestFeaturedClass = payload => ({
  type: REQUEST_FEATURED_CLASS,
  payload,
});

export const featuredClassSuccess = payload => ({
  type: SUCCESS_FEATURED_CLASS,
  payload,
});

export const featuredClassFailed = error => ({
  type: FAILED_FEATURED_CLASS,
  payload: error,
});

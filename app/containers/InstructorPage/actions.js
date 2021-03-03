import {
  REQUEST_INSTRUCTOR,
  SUCCESS_INSTRUCTOR,
  FAILED_INSTRUCTOR,
  REQUEST_ADD_INSTRUCTOR,
  SUCCESS_ADD_INSTRUCTOR,
  FAILED_ADD_INSTRUCTOR,
  REQUEST_DELETE_INSTRUCTOR,
  SUCCESS_DELETE_INSTRUCTOR,
  FAILED_DELETE_INSTRUCTOR,
  REQUEST_VIEW_INSTRUCTOR,
  SUCCESS_VIEW_INSTRUCTOR,
  FAILED_VIEW_INSTRUCTOR,
  REQUEST_INSTRUCTOR_CLASS,
  SUCCESS_INSTRUCTOR_CLASS,
  FAILED_INSTRUCTOR_CLASS,
} from './constants';

export const requestInstructor = user => ({
  type: REQUEST_INSTRUCTOR,
  payload: user,
});

export const instructorSuccess = payload => ({
  type: SUCCESS_INSTRUCTOR,
  payload,
});

export const instructorFailed = error => ({
  type: FAILED_INSTRUCTOR,
  payload: error,
});
export const requestAddInstructor = user => ({
  type: REQUEST_ADD_INSTRUCTOR,
  payload: user,
});

export const addInstructorSuccess = payload => ({
  type: SUCCESS_ADD_INSTRUCTOR,
  payload,
});

export const addInstructorFailed = error => ({
  type: FAILED_ADD_INSTRUCTOR,
  payload: error,
});
export const requestDeleteInstructor = user => ({
  type: REQUEST_DELETE_INSTRUCTOR,
  payload: user,
});

export const deleteInstructorSuccess = payload => ({
  type: SUCCESS_DELETE_INSTRUCTOR,
  payload,
});

export const deleteInstructorFailed = error => ({
  type: FAILED_DELETE_INSTRUCTOR,
  payload: error,
});

export const requestViewInstructor = user => ({
  type: REQUEST_VIEW_INSTRUCTOR,
  payload: user,
});

export const viewInstructorSuccess = payload => ({
  type: SUCCESS_VIEW_INSTRUCTOR,
  payload,
});

export const viewInstructorFailed = error => ({
  type: FAILED_VIEW_INSTRUCTOR,
  payload: error,
});
export const requestInstructorClass = user => ({
  type: REQUEST_INSTRUCTOR_CLASS,
  payload: user,
});

export const instructorClassSuccess = payload => ({
  type: SUCCESS_INSTRUCTOR_CLASS,
  payload,
});

export const instructorClassFailed = error => ({
  type: FAILED_INSTRUCTOR_CLASS,
  payload: error,
});

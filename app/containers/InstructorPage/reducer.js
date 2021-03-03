import produce from 'immer';
import {
  REQUEST_INSTRUCTOR,
  SUCCESS_INSTRUCTOR,
  FAILED_INSTRUCTOR,
  REQUEST_ADD_INSTRUCTOR,
  SUCCESS_ADD_INSTRUCTOR,
  FAILED_ADD_INSTRUCTOR,
  REQUEST_VIEW_INSTRUCTOR,
  SUCCESS_VIEW_INSTRUCTOR,
  FAILED_VIEW_INSTRUCTOR,
  REQUEST_DELETE_INSTRUCTOR,
  SUCCESS_DELETE_INSTRUCTOR,
  FAILED_DELETE_INSTRUCTOR,
  REQUEST_INSTRUCTOR_CLASS,
  SUCCESS_INSTRUCTOR_CLASS,
  FAILED_INSTRUCTOR_CLASS,
} from './constants';

// The initial state of the App
const initialState = {
  instructor: {
    isAuthenticated: false,
  },
  addInstructor: {
    loading: false,
    error: '',
    success: '',
  },
  deleteInstructor: {
    loading: false,
    error: '',
    success: '',
  },
  viewInstructor: {
    loading: false,
    error: '',
    success: '',
  },
  instructorClass: {},
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const instructorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_INSTRUCTOR:
        draft.loading = true;
        draft.error = '';
        draft.instructor = {};
        break;
      case SUCCESS_INSTRUCTOR:
        draft.loading = false;
        draft.instructor = action.payload;
        draft.error = '';
        break;
      case FAILED_INSTRUCTOR:
        draft.loading = false;
        draft.instructor = {};
        draft.error = action.payload;
        break;
      case REQUEST_VIEW_INSTRUCTOR:
        draft.loading = true;
        draft.error = '';
        draft.viewInstructor = {};
        break;
      case SUCCESS_VIEW_INSTRUCTOR:
        draft.loading = false;
        draft.viewInstructor = action.payload;
        draft.error = '';
        break;
      case FAILED_VIEW_INSTRUCTOR:
        draft.loading = false;
        draft.viewInstructor = {};
        draft.error = action.payload;
        break;
      case REQUEST_INSTRUCTOR_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.instructorClass = {};
        break;
      case SUCCESS_INSTRUCTOR_CLASS:
        draft.loading = false;
        draft.instructorClass = action.payload;
        draft.error = '';
        break;
      case FAILED_INSTRUCTOR_CLASS:
        draft.loading = false;
        draft.instructorClass = {};
        draft.error = action.payload;
        break;
      case REQUEST_ADD_INSTRUCTOR:
        draft.addInstructor.loading = true;
        draft.addInstructor.error = '';
        draft.addInstructor.success = '';
        break;
      case SUCCESS_ADD_INSTRUCTOR:
        draft.addInstructor.loading = false;
        draft.addInstructor = action.payload;
        draft.addInstructor.error = '';
        break;
      case FAILED_ADD_INSTRUCTOR:
        draft.addInstructor.loading = false;
        draft.addInstructor.success = false;
        draft.addInstructor.error = action.payload;
        break;
      case REQUEST_DELETE_INSTRUCTOR:
        draft.deleteInstructor.loading = true;
        draft.deleteInstructor.error = '';
        draft.deleteInstructor.success = '';
        break;
      case SUCCESS_DELETE_INSTRUCTOR:
        draft.deleteInstructor.loading = false;
        draft.deleteInstructor = action.payload;
        draft.deleteInstructor.error = '';
        break;
      case FAILED_DELETE_INSTRUCTOR:
        draft.deleteInstructor.loading = false;
        draft.deleteInstructor.success = false;
        draft.deleteInstructor.error = action.payload;
        break;
    }
  });

export default instructorReducer;

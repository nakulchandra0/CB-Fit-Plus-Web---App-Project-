import produce from 'immer';
import {
  REQUEST_CLASS,
  SUCCESS_CLASS,
  FAILED_CLASS,
  REQUEST_VIEW_CLASS,
  SUCCESS_VIEW_CLASS,
  FAILED_VIEW_CLASS,
  REQUEST_ADD_CLASS,
  SUCCESS_ADD_CLASS,
  FAILED_ADD_CLASS,
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

// The initial state of the App
const initialState = {
  classes: {
    isAuthenticated: false,
  },
  instructor: {
    loading: false,
    error: '',
    success: '',
  },
  addClass: {
    loading: false,
    error: '',
    success: '',
  },
  viewClass: {
    loading: false,
    error: '',
    success: '',
  },
  featuredClass: {},
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const classReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.classes = {};
        break;
      case SUCCESS_CLASS:
        draft.loading = false;
        draft.classes = action.payload;
        draft.error = '';
        break;
      case FAILED_CLASS:
        draft.loading = false;
        draft.classes = {};
        draft.error = action.payload;
        break;
      case REQUEST_VIEW_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.viewClass = {};
        break;
      case SUCCESS_VIEW_CLASS:
        draft.loading = false;
        draft.viewClass = action.payload;
        draft.error = '';
        break;
      case FAILED_VIEW_CLASS:
        draft.loading = false;
        draft.viewClass = {};
        draft.error = action.payload;
        break;
      case REQUEST_ADD_CLASS:
        draft.addClass.loading = true;
        draft.addClass.error = '';
        draft.addClass.success = '';
        break;
      case SUCCESS_ADD_CLASS:
        draft.addClass.loading = false;
        draft.addClass = action.payload;
        draft.addClass.error = '';
        break;
      case FAILED_ADD_CLASS:
        draft.addClass.loading = false;
        draft.addClass.success = false;
        draft.addClass.error = action.payload;
        break;
      case REQUEST_ALL_INSTRUCTOR:
        draft.loading = true;
        draft.error = '';
        draft.instructor = {};
        break;
      case SUCCESS_ALL_INSTRUCTOR:
        draft.loading = false;
        draft.instructor = action.payload;
        draft.error = '';
        break;
      case FAILED_ALL_INSTRUCTOR:
        draft.loading = false;
        draft.instructor = {};
        draft.error = action.payload;
        break;

      case REQUEST_DELETE_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.singleUser = {};
        break;
      case SUCCESS_DELETE_CLASS:
        draft.loading = false;
        draft.error = '';
        draft.singleUser = action.payload;
        break;
      case FAILED_DELETE_CLASS:
        draft.loading = false;
        draft.error = action.payload;
        draft.singleUser = {};
        break;
      case REQUEST_FEATURED_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.featuredClass = {};
        break;
      case SUCCESS_FEATURED_CLASS:
        draft.loading = false;
        draft.error = '';
        draft.featuredClass = action.payload;
        break;
      case FAILED_FEATURED_CLASS:
        draft.loading = false;
        draft.error = action.payload;
        draft.featuredClass = {};
        break;
    }
  });

export default classReducer;

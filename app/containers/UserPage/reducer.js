import produce from 'immer';
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

// The initial state of the App
const initialState = {
  user: [],
  singleUser: [],
  addUser: [],
  loading: false,
  error: '',
  state: [],
  class: [],
  bookClass: [],
  completedClass: [],
  activeUser: {},
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_USER:
        draft.loading = true;
        draft.error = '';
        draft.user = [];
        draft.singleUser = [];
        break;
      case SUCCESS_USER:
        draft.loading = false;
        draft.user = action.payload;
        draft.error = '';
        draft.addUser = [];
        break;
      case FAILED_USER:
        draft.loading = false;
        draft.user = {};
        draft.error = action.payload;
        break;
      case REQUEST_USER_BY_ID:
        draft.loading = true;
        draft.error = '';
        draft.singleUser = [];
        break;
      case SUCCESS_USER_BY_ID:
        draft.loading = false;
        draft.singleUser = action.payload;
        draft.error = '';
        break;
      case FAILED_USER_BY_ID:
        draft.loading = false;
        draft.singleUser = {};
        draft.error = action.payload;
        break;
      case REQUEST_ADD_USER:
        draft.loading = true;
        draft.error = '';
        draft.addUser = {};
        break;
      case SUCCESS_ADD_USER:
        draft.loading = false;
        draft.addUser = action.payload;
        draft.error = '';
        break;
      case FAILED_ADD_USER:
        draft.loading = false;
        draft.addUser = {};
        draft.error = action.payload;
        break;

      case REQUEST_STATE:
        draft.loading = true;
        draft.error = '';
        draft.state = [];
        draft.singleState = [];
        break;
      case SUCCESS_STATE:
        draft.loading = false;
        draft.state = action.payload;
        draft.error = '';
        draft.addState = [];
        break;
      case FAILED_STATE:
        draft.loading = false;
        draft.state = {};
        draft.error = action.payload;
        break;
      case REQUEST_COUNTRY_BY_ID:
        draft.loading = true;
        draft.error = '';
        draft.singleCountry = [];
        break;
      case SUCCESS_COUNTRY_BY_ID:
        draft.loading = false;
        draft.singleCountry = action.payload;
        draft.error = '';
        break;
      case FAILED_COUNTRY_BY_ID:
        draft.loading = false;
        draft.singleCountry = {};
        draft.error = action.payload;
        break;
      case REQUEST_ADD_COUNTRY:
        draft.loading = true;
        draft.error = '';
        draft.addCountry = {};
        break;
      case SUCCESS_ADD_COUNTRY:
        draft.loading = false;
        draft.addCountry = action.payload;
        draft.error = '';
        break;
      case FAILED_ADD_COUNTRY:
        draft.loading = false;
        draft.addCountry = {};
        draft.error = action.payload;
        break;

      case REQUEST_DELETE_USER:
        draft.loading = true;
        draft.error = '';
        draft.singleUser = {};
        break;
      case SUCCESS_DELETE_USER:
        draft.loading = false;
        draft.error = '';
        draft.singleUser = action.payload;
        break;
      case FAILED_DELETE_USER:
        draft.loading = false;
        draft.error = action.payload;
        draft.singleUser = {};
        break;

      case REQUEST_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.class = [];
        break;
      case SUCCESS_CLASS:
        draft.loading = false;
        draft.class = action.payload;
        draft.error = '';
        break;
      case FAILED_CLASS:
        draft.loading = false;
        draft.class = {};
        draft.error = action.payload;
        break;

      case REQUEST_BOOK_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.bookClass = [];
        break;
      case SUCCESS_BOOK_CLASS:
        draft.loading = false;
        draft.bookClass = action.payload;
        draft.error = '';
        break;
      case FAILED_BOOK_CLASS:
        draft.loading = false;
        draft.bookClass = {};
        draft.error = action.payload;
        break;

      case REQUEST_COMPLETED_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.completedClass = [];
        break;
      case SUCCESS_COMPLETED_CLASS:
        draft.loading = false;
        draft.completedClass = action.payload;
        draft.error = '';
        break;
      case FAILED_COMPLETED_CLASS:
        draft.loading = false;
        draft.completedClass = {};
        draft.error = action.payload;
        break;

      case REQUEST_DEACTIVE_CLASS:
        draft.loading = true;
        draft.error = '';
        draft.activeUser = {};
        break;
      case SUCCESS_DEACTIVE_CLASS:
        draft.loading = false;
        draft.error = '';
        draft.activeUser = action.payload;
        break;
      case FAILED_DEACTIVE_CLASS:
        draft.loading = false;
        draft.error = action.payload;
        draft.activeUser = {};
        break;
    }
  });

export default userReducer;

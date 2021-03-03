import produce from 'immer';
import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
  REQUEST_LOGOUT,
  SUCCESS_LOGOUT,
  FAILED_LOGOUT,
} from './constants';

// The initial state of the App
const initialState = {
  user: {
    isAuthenticated: false,
  },
  loading: false,
  error: '',
  isError: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_LOGIN:
        draft.loading = true;
        draft.error = '';
        draft.user = { isAuthenticated: false };
        draft.isError = false;
        break;
      case SUCCESS_LOGIN:
        draft.loading = false;
        draft.user = action.payload;
        draft.error = '';
        break;
      case FAILED_LOGIN:
        draft.loading = false;
        draft.user = { isAuthenticated: false };
        draft.error = action.payload;
        draft.isError = true;
        break;
      case REQUEST_LOGOUT:
        draft.loading = true;
        draft.error = '';
        draft.user = { isAuthenticated: false };
        break;
      case SUCCESS_LOGOUT:
        draft.loading = false;
        draft.user = action.payload;
        draft.error = '';
        break;
      case FAILED_LOGOUT:
        draft.loading = false;
        draft.user = { isAuthenticated: false };
        draft.error = action.payload;
        break;
    }
  });

export default userReducer;

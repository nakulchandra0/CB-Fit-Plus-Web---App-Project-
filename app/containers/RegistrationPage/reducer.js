import produce from 'immer';
import {
  REQUEST_REGISTER,
  SUCCESS_REGISTER,
  FAILED_REGISTER,
  REQUEST_VERIFY_OTP,
  SUCCESS_VERIFY_OTP,
  FAILED_VERIFY_OTP,
  CLEAR_VERIFY_OTP,
  RESET_REGISTER,
} from './constants';

// The initial state of the App
const initialState = {
  user: {},
  loading: false,
  error: '',
  registerSuccess: '',
  success: false,
  isVerify: false,
  message: '',
  token: '',
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_REGISTER:
        draft.loading = true;
        draft.error = '';
        draft.user = {};
        break;
      case SUCCESS_REGISTER:
        draft.loading = false;
        draft.user = action.payload;
        draft.registerSuccess = action.payload;
        draft.error = '';
        break;
      case FAILED_REGISTER:
        draft.loading = false;
        draft.user = {};
        draft.error = action.payload;
        break;
      case REQUEST_VERIFY_OTP:
        draft.loading = true;
        draft.success = false;
        draft.message = '';
        break;
      case SUCCESS_VERIFY_OTP:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.isVerify = action.payload.success;
        draft.message = action.payload.message;
        draft.token = action.payload.data.token;
        break;
      case FAILED_VERIFY_OTP:
        draft.loading = false;
        draft.message = action.payload;
        draft.error = action.payload;
        break;
      case CLEAR_VERIFY_OTP:
        draft.isVerify = false;

        break;
      case RESET_REGISTER:
        draft.user = {};
        draft.loading = false;
        draft.error = '';
        draft.registerSuccess = '';
        draft.success = false;
        draft.isVerify = false;
        draft.message = '';
        draft.token = '';
        break;
    }
  });

export default registerReducer;

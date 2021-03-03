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

export const requestRegister = user => ({
  type: REQUEST_REGISTER,
  payload: user,
});

export const RegisterSuccess = payload => ({
  type: SUCCESS_REGISTER,
  payload,
});

export const RegisterFailed = error => ({
  type: FAILED_REGISTER,
  payload: error,
});

export const requestVerifyOtp = otp => ({
  type: REQUEST_VERIFY_OTP,
  payload: otp,
});

export const VerifyOtpSuccess = payload => ({
  type: SUCCESS_VERIFY_OTP,
  payload,
});

export const VerifyOtpFailed = error => ({
  type: FAILED_VERIFY_OTP,
  payload: error,
});

export const clearVerifyOtp = () => ({
  type: CLEAR_VERIFY_OTP,
});

export const resetRegister = () => ({
  type: RESET_REGISTER,
});

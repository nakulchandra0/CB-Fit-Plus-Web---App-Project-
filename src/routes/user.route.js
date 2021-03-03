import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { userController } from "../controllers";
import { auth } from "../middleware";
import { twilioService } from "../utils";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .get(INTERNAL_LINKS.USER.PROFILE_VIEW, auth, userController.profileView)
  .get(INTERNAL_LINKS.USER.GET_PROFILE, auth, userController.getProfile)
  .post(INTERNAL_LINKS.USER.SIGNUP, userController.signup)
  .post(
    INTERNAL_LINKS.USER.FORGOT_PASSWORD_VERIFICATION,
    userController.forgotPasswordVerify
  )
  .post(INTERNAL_LINKS.USER.FORGOT_PASSWORD, userController.forgotPassword)
  .put(INTERNAL_LINKS.USER.PROFILE_EDIT, auth, userController.profileEdit)
  .post(INTERNAL_LINKS.USER.SIGNIN, userController.login)
  .post(INTERNAL_LINKS.USER.SUBSCRIBE_CLASS, auth, userController.subscribed)
  .post(INTERNAL_LINKS.USER.SOCIAL_LOGIN, userController.socialLogin)
  .post(INTERNAL_LINKS.USER.SEND_OTP, auth, userController.sendotp)
  .post(INTERNAL_LINKS.USER.VRIFY_OTP, auth, userController.verifyotp)
  .post(INTERNAL_LINKS.USER.VALID_PHONE, auth, userController.checkNumber)
  .post(INTERNAL_LINKS.USER.VERIFY_EMAIL, auth, userController.verifyEmail)
  .post(INTERNAL_LINKS.USER.CLASS_COMPLETE, auth, userController.completeClass);

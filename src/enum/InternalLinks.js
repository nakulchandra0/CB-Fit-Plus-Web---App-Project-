export default {
  BASE_API_URL: "/api/v1/",

  USER: {
    BASE_URL: "/api/v1/users",
    SIGNUP: "/signup",
    FORGOT_PASSWORD_VERIFICATION: "/forgotPasswordVerification",
    FORGOT_PASSWORD: "/forgotPassword",
    PROFILE_EDIT: "/profileEdit",
    PROFILE_VIEW: "/profileView",
    GET_PROFILE: "/getProfile",
    SIGNIN: "/signin",
    SUBSCRIBE_CLASS: "/subcribeClass",
    SOCIAL_LOGIN: "/socialLogin",
    SEND_OTP: "/sendotp",
    VRIFY_OTP: "/verifyotp",
    VALID_PHONE: "/checknumber",
    VERIFY_EMAIL: "/verifyEmail",
    CLASS_COMPLETE: "/classComplete",
  },

  REVIEW: {
    BASE_URL: "/api/v1/review",
    POST_REVIEW: "/postReview",
  },

  GOOGLE: {
    BASE_URL: "/api/v1/google",
    GET_URL: "/getUrl",
    AUTH_URL: "/googleAuth",
  },

  FB: {
    BASE_URL: "/api/v1/fb",
    GET_URL: "/getUrl",
    AUTH_URL: "/fbAuth",
    DE_AUTH: "/deAuth",
    GET_POLICY: "/policy",
  },

  CLASSES: {
    BASE_URL: "/api/v1/classes",
    POST_CLASS: "/postClass",
    ADD_CLASS: "/addClass",
    BOOKMARK_CLASS: "/bookmarkClass",
    COMPLETE_CLASS: "/completeClass",
    GET_ALL_CLASSES: "/getAllClasses",
    GET_HOME_CLASSES: "/getHomeClasses",
    GET_SCHEDULE_CLASSES: "/getScheduleClasses",
    GET_TUTOR_COUNT: "/getTutorCount",
    GET_ONDEMAND_CLASSES: "/getonDemandClasses",
  },

  ADMIN: {
    BASE_URL: "/api/v1/admin",
    ADD_DATA: "/addData",
    GET_ALL_USERS: "/getAllUsers",
    GET_USERS: "/getUsers",
    VIEW_USER: "/viewUser/:id",
    VIEW_USER_CLASSES: "/viewuserClass/:id",
    GET_CLASSES: "/classes",
    VIEW_CLASS: "/class/:id",
    GET_ALL_INSTRUCTOR: "/getAllInstructor",
    GET_COUNTRY: "/getCountry",
    GET_STATE: "/getState",
    REMOVE_CLASS: "/removeClass",
    FEATURED_CLASS: "/featuredClass",
    DELETE_USER: "/deleteUser",
    IS_ACTIVE: "/isActive",
  },

  STRIPE: {
    BASE_URL: "/api/v1/stripe",
    GET_PRODUCT: "/plans",
    CREATE_SUB: "/subscribe",
    GET_PAYMENT_INTENT: "/payment-intent",
    WEBHOOK: "/webhook",
  },
};

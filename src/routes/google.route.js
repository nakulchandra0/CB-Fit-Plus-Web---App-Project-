import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { googleController } from "../controllers";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .post(INTERNAL_LINKS.GOOGLE.GET_URL, googleController.getSignUrl)
  .get(INTERNAL_LINKS.GOOGLE.AUTH_URL, googleController.getGoogleMail);

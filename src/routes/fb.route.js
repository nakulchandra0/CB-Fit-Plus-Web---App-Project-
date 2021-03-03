import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { fbController } from "../controllers";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .post(INTERNAL_LINKS.FB.GET_URL, fbController.getSignUrl)
  .get(INTERNAL_LINKS.FB.AUTH_URL, fbController.getEmail)
  .post(INTERNAL_LINKS.FB.DE_AUTH, fbController.fbDeauth)
  .get(INTERNAL_LINKS.FB.GET_POLICY, fbController.getPolicy);

import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { reviewController } from "../controllers";
import { auth } from "../middleware";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .post(INTERNAL_LINKS.REVIEW.POST_REVIEW, auth, reviewController.postReview);

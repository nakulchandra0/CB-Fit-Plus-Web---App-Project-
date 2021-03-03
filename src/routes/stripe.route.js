import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { stripeController } from "../controllers";
import { auth } from "../middleware";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .get(INTERNAL_LINKS.STRIPE.GET_PRODUCT, stripeController.getProduct)
  .post(
    INTERNAL_LINKS.STRIPE.GET_PAYMENT_INTENT,
    auth,
    stripeController.createPaymentIntent
  )
  .post(INTERNAL_LINKS.STRIPE.CREATE_SUB, auth, stripeController.createSub)
  .post(INTERNAL_LINKS.STRIPE.WEBHOOK, stripeController.webhook);

import _stripe from "stripe";

require("dotenv").config({ path: ".env" });
import { errorLogger } from "../utils";
import { stripePaymentModel, stripeSubscriptionModel } from "../models";
import { stripeService, userService } from "../mongoServices";

const STRIPE_KEY = process.env.STRIPE_KEY;
const WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY;

const stripe = _stripe(STRIPE_KEY);

const createUser = async (email, token) => {
  try {
    const createCustomer = await stripe.customers.create({
      email,
      source: token,
    });
    return createCustomer;
  } catch (error) {
    return error;
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await stripe.prices.list({ active: true });

    res.status(200).send({ success: true, plans: products });
  } catch (error) {
    res.status(400).send({ Success: "false", Error: error.message });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    const { stripe_code, email, _id } = req.currentUser;
    const { amount, currency, token } = req.body;

    let customerId;

    if (!stripe_code) {
      customerId = await createUser(email, token);
      const updateUser = await userService.findOneAndUpdate(
        { _id },
        { stripe_code: customerId.id }
      );
      if (!updateUser) throw new Error("Error While Updating User");
    }

    const options = {
      amount: Number(amount) * 100,
      currency,
      customer: stripe_code ? stripe_code : customerId.id,
      confirm: true,
    };
    const payment_intent = await processPayment(options);
    res.status(200).send({ success: true, payment: payment_intent });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ Success: "false", Error: error.message });
  }
};

const processPayment = async (options) => {
  try {
    const payment_intent = await stripe.paymentIntents.create(options);
    return payment_intent;
  } catch (error) {
    return error;
  }
};

const createSub = async (req, res) => {
  try {
    const { stripe_code, email, _id } = req.currentUser;
    const { price } = req.body;

    let customerId;

    if (!stripe_code) {
      customerId = await createUser(email);
      const updateUser = await userService.findOneAndUpdate(
        { _id },
        { stripe_code: customerId.id }
      );
      if (!updateUser) throw new Error("Error While Updating User");
    }

    const subscription = await stripe.subscriptions.create({
      // customer: "cus_IXspMLjdQpszNy",
      // items: [{ price: "price_1Hx4aoJpiWqJsjeJYrdFvcEI" }],
      customer: stripe_code ? stripe_code : customerId.id,
      items: [{ price }], //send price id from plan
    });
    subscription && res.status(200).send({ success: true, data: subscription });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ Success: "false", Error: error.message });
  }
};

const webhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, WEBHOOK_KEY);

    let data = {};

    switch (event.type) {
      case "customer.created":
        console.log("usercreated");
        break;
      case "customer.subscription.created":
        console.log("subscriptionCreated");
        data = {
          event_id: event.id,
          sub_data: event.data.object,
          status: event.data.object.status,
        };
        await stripeService.insertRecord(stripeSubscriptionModel, data);
        break;
      case "customer.subscription.deleted":
        console.log("subscriptiondeleted");
        break;
      case "subscription_schedule.created":
        console.log("subscription_created");
        break;
      case "subscription_schedule.completed":
        console.log("subscription_completed");
        break;
      case "subscription_schedule.aborted":
        console.log("subscription_aborted");
        break;
      case "payment_intent.succeeded":
        console.log("payment_intent.succeeded");
        data = {
          event_id: event.id,
          amount: event.data.object.amount,
          receipt_email: event.data.object.charges.receipt_email,
          receipt_url: event.data.object.charges.receipt_url,
          charges: event.data.object.charges,
          methodType: event.data.object.payment_method_types,
          status: event.data.object.status,
        };
        await stripeService.insertRecord(stripePaymentModel, data);
        break;
      case "payment_intent.payment_failed":
        console.log("Payment Failed");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send({ success: true });
  } catch (error) {
    console.log("error", error);
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ Success: "false", Error: error.message });
  }
};

export default {
  createUser,
  webhook,
  getProduct,
  createPaymentIntent,
  createSub,
};

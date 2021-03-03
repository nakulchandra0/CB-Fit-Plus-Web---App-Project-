import { Schema, model } from "mongoose";

const stripeSubscription = new Schema(
  {
    event_id: { type: String },
    account_number: { type: String },
    sub_data: { type: Object },
    status: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const subscribeIntent = new model("subscribeIntent", stripeSubscription);

export default subscribeIntent;

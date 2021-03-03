import { Schema, model } from "mongoose";

const stripePaymentIntent = new Schema(
  {
    event_id: { type: String },
    amount: { type: Number },
    paymentMethod: { type: String },
    receipt_email: { type: String },
    receipt_url: { type: String },
    paid: { type: Boolean },
    charges: { type: Object },
    status: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const paymentIntent = new model("paymentIntent", stripePaymentIntent);

export default paymentIntent;

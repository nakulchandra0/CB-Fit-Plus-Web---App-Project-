import { Schema, model } from "mongoose";

const stripeSources = new Schema(
  {
    event_id: { type: String },
    account_number: { type: String },
    ach_credit_transfer: { type: Object },
    amount: { type: String },
    userDetail: { type: Object },
    receiver: { type: Object },
    usage: { type: String },
    type: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const sourceIntent = new model("sourceIntent", stripeSources);

export default sourceIntent;

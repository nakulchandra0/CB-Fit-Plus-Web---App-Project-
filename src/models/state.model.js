import { Schema, model } from "mongoose";

const stateSchema = new Schema({
  country_code: { type: String },
  country_code3: { type: String },
  subdivision_name: { type: String },
  code: { type: String },
  state_status: { type: String },
});

const country = new model("State", stateSchema);

export default country;

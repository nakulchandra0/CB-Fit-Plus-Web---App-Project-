import { Schema, model } from "mongoose";

const countrySchema = new Schema({
  cont_id: { type: String },
  cont_code: { type: String },
  cont_name: { type: String },
  cont_status: { type: String },
  cont_include: { type: String },
  isocode2: { type: String },
  isocode3: { type: String },
  irs2: { type: String },
  old: { type: String },
  restricted: { type: String },
});

const country = new model("Country", countrySchema);

export default country;

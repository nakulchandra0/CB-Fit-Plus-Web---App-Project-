import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String },
    name: { type: String },
    phone: { type: String },
    dob: { type: Date },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "NON-BINARY", "PREFER NOT TO ANSWER"],
      default: "MALE",
    },
    loginType: {
      type: String,
      enum: ["GMAIL", "FB", "NATIVE"],
      default: "NATIVE",
    },
    social_id: { type: String },
    classes_id: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    subscriptionType: { type: String },
    paymentMethod: { type: Object },
    subscriptionplan: { type: String },
    country: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    image: { type: String },
    password: { type: String },
    isActive: { type: Boolean, default: true },
    altPhone: { type: String },
    instaUserName: { type: String },
    fullImage: { type: String },
    statement: { type: String },
    stripe_code: { type: String },
    role: {
      type: String,
      enum: ["USER", "INSTRUCTOR", "SUPERADMIN", "ADMIN"],
      default: "USER",
    },
    isDeleted: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
    classes_subscription_date: [{ type: Date }],
  },
  { timestamps: true, versionKey: false }
);

const User = new model("User", userSchema);

export default User;

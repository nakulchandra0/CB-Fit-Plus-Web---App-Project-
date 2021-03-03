import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    instructorId: { type: Schema.Types.ObjectId, ref: "User" },
    // videoId: { type: Schema.Types.ObjectId, ref: "videos" },
    star: { type: Number },
    reviews: { type: [String] },
    comment: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const Review = new model("Review", reviewSchema);

export default Review;

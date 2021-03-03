import { reviewModel } from "../models";

const insertOne = async (data) => {
  let review = {},
    saveReview = null;
  review = new reviewModel(data);
  saveReview = await review.save();
  return saveReview;
};

export default { insertOne };

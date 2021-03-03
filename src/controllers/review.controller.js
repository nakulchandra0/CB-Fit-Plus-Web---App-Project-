import { errorLogger } from "../utils";
import { reviewService } from "../mongoServices";

const postReview = async (req, res) => {
  try {
    let { body, currentUser } = req,
      newBody = {},
      createReview = null;
    newBody = {
      userId: currentUser._id,
      ...body,
    };

    createReview = await reviewService.insertOne(newBody);
    if (!createReview) throw new Error("Error While Submitting Review");

    createReview &&
      res.status(200).send({ success: true, message: "Review Submitted" });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

export default { postReview };

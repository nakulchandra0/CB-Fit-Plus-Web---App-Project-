import Joi from "joi";

const profileEditSchema = Joi.object()
  .keys({
    password: Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
      .message(
        "Password must contain 8 characters with one uppercase and one numeric value"
      ),
  })
  .unknown(true);

export default profileEditSchema;

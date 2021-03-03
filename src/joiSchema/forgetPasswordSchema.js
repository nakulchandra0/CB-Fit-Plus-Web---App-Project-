import Joi from "joi";

const forgetPasswordSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
      .message(
        "Password must contain 8 characters with one uppercase and one numeric value"
      ),
    confirmPassword: Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
      .message(
        "Password must contain 8 characters with one uppercase and one numeric value"
      ),
  })
  .unknown(true);

export default forgetPasswordSchema;

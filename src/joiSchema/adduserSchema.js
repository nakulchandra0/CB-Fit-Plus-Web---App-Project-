import Joi from "joi";

const addUserSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
      .message(
        "Password must contain 8 characters with one uppercase and one numeric value"
      )
      .required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postcode: Joi.string().required(),
  })
  .unknown(true);

const addInstructorSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    altPhone: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
      .message(
        "Password must contain 8 characters with one uppercase and one numeric value"
      )
      .required(),
  })
  .unknown(true);

const editInstructorSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    altPhone: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
  })
  .unknown(true);

export default {
  addUserSchema,
  addInstructorSchema,
  editInstructorSchema,
};

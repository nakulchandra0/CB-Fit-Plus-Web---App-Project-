import Joi from "joi";

const addClassSchema = Joi.object()
  .keys({
    date: Joi.string().required(),
    time: Joi.string().required(),
    recordingDate: Joi.string().required(),
    recordingTime: Joi.string().required(),
    classType: Joi.string().required(),
    duration: Joi.string().required(),
    difficulty: Joi.string().required(),
    danceClassType: Joi.string().required(),
    songAndArtist: Joi.string().required(),
    userId: Joi.string().alphanum().required(),
  })
  .unknown(true);

const liveClassSchema = Joi.object()
  .keys({
    date: Joi.string().required(),
    time: Joi.string().required(),
    recordingDate: Joi.string().required(),
    recordingTime: Joi.string().required(),
    classType: Joi.string().required(),
    duration: Joi.string().required(),
    difficulty: Joi.string().required(),
    danceClassType: Joi.string().required(),
    songAndArtist: Joi.string().required(),
    userId: Joi.string().required(),
  })
  .unknown(true);

const editClassSchema = Joi.object()
  .keys({
    date: Joi.string().required(),
    time: Joi.string().required(),
    recordingDate: Joi.string().required(),
    recordingTime: Joi.string().required(),
    classType: Joi.string().required(),
    duration: Joi.string().required(),
    difficulty: Joi.string().required(),
    danceClassType: Joi.string().required(),
    songAndArtist: Joi.string().required(),
    userId: Joi.string().required(),
  })
  .unknown(true);

export default {
  addClassSchema,
  editClassSchema,
  liveClassSchema,
};

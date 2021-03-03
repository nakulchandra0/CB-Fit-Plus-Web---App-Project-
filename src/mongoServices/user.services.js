import { async } from "crypto-random-string";
import moment from "moment";
import { classesModel, userModel } from "../models";

const userQuery = async (filter) => {
  const checkUser = await userModel.findOne(filter);
  return checkUser;
};

const userProfile = async (filter, projection) => {
  const getProfile = await userModel.findOne(filter, projection);
  return getProfile;
};

const insertOne = async (data) => {
  let user = {},
    saveUser = null;
  user = new userModel(data);
  saveUser = await user.save();
  return saveUser;
};

const findOneAndUpdate = async (filter, update) => {
  let options = { new: true };
  const user = await userModel.findOneAndUpdate(filter, update, options);
  return user;
};

const findByIdAndUpdate = async (_id, body) => {
  const updateUser = await userModel.findByIdAndUpdate(_id, body);
  return updateUser;
};

const findAllUsers = async (filter, limit, page, role) => {
  const users = await userModel
    .find(filter)
    .where(role)
    .skip((page - 1) * limit)
    .limit(limit * 1);
  return users;
};

const getClasses = async (filter, userId) => {
  const data = userModel.aggregate([
    { $match: { _id: userId._id } },
    {
      $lookup: {
        from: "classes",
        localField: "classes_id",
        foreignField: "_id",
        as: "classData",
      },
    },
    { $unwind: "$classData" },
    {
      $match: {
        $and: [filter],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "classData.userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        v_id: "$classData._id",
        name: {
          $cond: {
            if: "$userData.name",
            then: "$userData.name",
            else: "",
          },
        },
        title: {
          $concat: ["$classData.duration", " ", "$classData.danceClassType"],
        },
        difficulty: "$classData.difficulty",
        date: "$classData.date",
      },
    },
    {
      $project: {
        _id: 0,
        v_id: 1,
        title: 1,
        name: 1,
        difficulty: 1,
        date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$date" } },
      },
    },
    { $sort: { date: 1 } },
  ]);
  return data;
};

const findAllInstructors = async (filter, projection) => {
  let data = await userModel.aggregate([
    {
      $match: filter,
    },
    {
      $project: {
        ...projection,
      },
    },
  ]);
  return data;
};
const getTutorCount = async (filter) => {
  let existingClass = await userModel.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "classes",
        localField: "_id",
        foreignField: "userId",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $group: {
        _id: "$userData.userId",
        count: { $sum: 1 },
        userId: { $first: "$userData.userId" },
        image: {
          $first: {
            $cond: {
              if: "$image",
              then: "$image",
              else: "",
            },
          },
        },
        name: {
          $first: {
            $cond: {
              if: "$name",
              then: "$name",
              else: "",
            },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        userId: 1,
        count: 1,
        image: 1,
        _id: 0,
      },
    },
  ]);
  return existingClass;
};
export default {
  findAllUsers,
  insertOne,
  userQuery,
  findByIdAndUpdate,
  findOneAndUpdate,
  userProfile,
  getClasses,
  findAllInstructors,
  getTutorCount,
};

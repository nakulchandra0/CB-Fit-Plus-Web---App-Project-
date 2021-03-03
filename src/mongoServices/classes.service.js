import { classesModel, completeClassModel } from "../models";
import mongoose from "mongoose";
import { checkSubPlan } from "../utils";
const { ObjectId } = require("mongodb");

const insertOne = async (data) => {
  let newClass = {},
    saveClass = null;
  newClass = new classesModel(data);
  saveClass = await newClass.save();
  return saveClass;
};

const findClass = async (filter) => {
  let existingClass = null;
  existingClass = await classesModel.findOne(filter);
  return existingClass;
};

const findOneAndUpdate = async (filter, update) => {
  let options = { new: true },
    updateClass = null;
  updateClass = await classesModel.findOneAndUpdate(filter, update, options);
  return updateClass;
};

const findAllClasses = async (filter, projection) => {
  let existingClass = await classesModel.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        name: {
          $cond: {
            if: "$userData.name",
            then: "$userData.name",
            else: "",
          },
        },
        title: { $concat: ["$duration", " ", "$danceClassType"] },
      },
    },
    {
      $project: {
        ...projection,
        name: 1,
        title: 1,
        date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$date" } },
      },
    },
  ]);
  return existingClass;
};

const findAllClassesWithSort = async (
  filter,
  projection,
  sortFilter,
  classId,
  subEndDate,
  subPlanEnd
) => {
  let existingClass = await classesModel.aggregate([
    {
      $addFields: {
        creationDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" },
        },
      },
    },
    { $match: filter },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        Date: {
          $toString: {
            $dayOfMonth: { date: "$date", timezone: "Asia/Kolkata" },
          },
        },
        month: {
          $toString: { $month: { date: "$date", timezone: "Asia/Kolkata" } },
        },
        year: {
          $toString: { $year: { date: "$date", timezone: "Asia/Kolkata" } },
        },
        hour: {
          $toString: { $hour: { date: "$date", timezone: "Asia/Kolkata" } },
        },
        minute: {
          $toString: { $minute: { date: "$date", timezone: "Asia/Kolkata" } },
        },
        second: {
          $toString: { $second: { date: "$date", timezone: "Asia/Kolkata" } },
        },
        name: {
          $cond: {
            if: "$userData.name",
            then: "$userData.name",
            else: "",
          },
        },
        videoForAiring: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: "$videoForAiring",
                else: "",
              },
            },
          },
        },
        videoForSneakPeek: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "$videoForSneakPeek",
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: "$videoForSneakPeek",
                else: "",
              },
            },
          },
        },
        videoForAiringThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekThumbUrl", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        description: {
          $cond: {
            if: "$staffComments",
            then: "$staffComments",
            else: "",
          },
        },
        title: { $concat: ["$duration", " ", "$danceClassType"] },
        videoForAiringFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringFile", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekFile", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekFile", ""],
                },
                else: "",
              },
            },
          },
        },
      },
    },
    {
      $project: {
        subscription_type: {
          $cond: {
            if: { $eq: ["$classType", "onDemand"] },
            then: "START",
            else: {
              $cond: {
                if: { $lte: [subEndDate, new Date()] },
                then: "SIGN UP",
                else: {
                  $cond: [{ $in: ["$_id", classId] }, "START", "SIGN UP"],
                },
              },
            },
          },
        },
        ...projection,
        name: 1,
        description: 1,
        videoForAiring: 1,
        videoForSneakPeek: 1,
        videoForAiringThumbUrl: 1,
        videoForSneakPeekThumbUrl: 1,
        title: 1,
        date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$date" } },
        newDate: {
          $concat: [
            "$Date",
            "-",
            "$month",
            "-",
            "$year",
            " ",
            "$hour",
            ":",
            "$minute",
            ":",
            "$second",
          ],
        },
        videoForAiringFile: 1,
        videoForSneakPeekFile: 1,
      },
    },
    { $sort: sortFilter },
  ]);
  return existingClass;
};

const findonDemandClasses = async (
  filter,
  projection,
  sortFilter,
  classId,
  subEndDate,
  subPlanEnd
) => {
  let existingClass = await classesModel.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        creationDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" },
        },
        name: {
          $cond: {
            if: "$userData.name",
            then: "$userData.name",
            else: "",
          },
        },
        videoForAiring: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: "$videoForAiring",
                else: "",
              },
            },
          },
        },
        videoForSneakPeek: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "$videoForSneakPeek",
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: "$videoForSneakPeek",
                else: "",
              },
            },
          },
        },
        videoForAiringThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekThumbUrl", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        description: {
          $cond: {
            if: "$staffComments",
            then: "$staffComments",
            else: "",
          },
        },
        title: { $concat: ["$duration", " ", "$danceClassType"] },
        videoForAiringFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringFile", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekFile", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekFile", ""],
                },
                else: "",
              },
            },
          },
        },
      },
    },
    {
      $project: {
        subscription_type: {
          $cond: {
            if: { $eq: ["$classType", "onDemand"] },
            then: "START",
            else: {
              $cond: {
                if: { $lte: [subEndDate, new Date()] },
                then: "SIGN UP",
                else: {
                  $cond: [{ $in: ["$_id", classId] }, "START", "SIGN UP"],
                },
              },
            },
          },
        },
        ...projection,
        name: 1,
        title: 1,
        videoForAiringThumbUrl: 1,
        videoForSneakPeekThumbUrl: 1,
        videoForSneakPeek: 1,
        videoForAiring: 1,
        description: 1,
        date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$date" } },
        videoForAiringFile: 1,
        videoForSneakPeekFile: 1,
      },
    },
    { $sort: sortFilter },
  ]);
  return existingClass;
};

const findHomeClasses = async (
  filter,
  projection,
  subEndDate,
  classId,
  sortFilter,
  subPlanEnd
) => {
  let existingClass = await classesModel.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        name: "$userData.name",
        videoForAiring: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: "$videoForAiring",
                else: "",
              },
            },
          },
        },
        videoForSneakPeek: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "$videoForSneakPeek",
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: "$videoForSneakPeek",
                else: "",
              },
            },
          },
        },
        videoForAiringThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekThumbUrl: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekThumbUrl", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekThumbUrl", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForAiringFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: "",
            else: {
              $cond: {
                if: { $lte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForAiringFile", ""],
                },
                else: "",
              },
            },
          },
        },
        videoForSneakPeekFile: {
          $cond: {
            if: { $eq: [subPlanEnd, true] },
            then: { $ifNull: ["$videoForSneakPeekFile", ""] },
            else: {
              $cond: {
                if: { $gte: ["$date", new Date()] },
                then: {
                  $ifNull: ["$videoForSneakPeekFile", ""],
                },
                else: "",
              },
            },
          },
        },
      },
    },
    {
      $project: {
        subscription_type: {
          $cond: {
            if: { $eq: ["$classType", "onDemand"] },
            then: "START",
            else: {
              $cond: {
                if: { $lte: [subEndDate, new Date()] },
                then: "SIGN UP",
                else: {
                  $cond: [{ $in: ["$_id", classId] }, "START", "SIGN UP"],
                },
              },
            },
          },
        },
        ...projection,
        title: { $concat: ["$duration", " ", "$danceClassType"] },
        videoForAiringThumbUrl: 1,
        videoForSneakPeekThumbUrl: 1,
        videoForAiring: 1,
        videoForSneakPeek: 1,
        description: {
          $cond: {
            if: "$staffComments",
            then: "$staffComments",
            else: "",
          },
        },
        name: {
          $cond: {
            if: "$name",
            then: "$name",
            else: "",
          },
        },
        date: { $dateToString: { format: "%G-%m-%d %H:%M:%S", date: "$date" } },
        videoForAiringFile: 1,
        videoForSneakPeekFile: 1,
      },
    },
    { $sort: sortFilter },
    { $limit: 5 },
  ]);
  return existingClass;
};

const findThumbnailClass = async (filter) => {
  let existingClass = null;
  existingClass = await classesModel.find(filter);
  return existingClass;
};

const findClasseswithInstructor = async (filter, page, limit) => {
  (page = page ? page : 0), (limit = limit ? limit : 10);
  return await classesModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "instructor",
      },
    },
    { $unwind: "$instructor" },
    {
      $addFields: {
        instructorId: "$instructor._id",
        instructorName: "$instructor.name",
        recordingTime: "$recordingDate",
        airTime: "$date",
      },
    },
    {
      $project: {
        title: 1,
        isFeatured: 1,
        recordingDate: {
          $dateToString: { format: "%m/%d/%Y", date: "$recordingDate" },
        },
        songAndArtist: 1,
        date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } },
        duration: 1,
        classType: 1,
        difficulty: 1,
        instructorName: 1,
        danceClassType: 1,
        recordingTime: {
          $dateToString: { format: "%H:%M", date: "$recordingDate" },
        },
        airTime: { $dateToString: { format: "%H:%M", date: "$date" } },
        videos: 1,
        previewVideos: 1,
        videoForAiring: 1,
        videoForSneakPeek: 1,
        bookmarkedBy: 1,
        instructorId: 1,
      },
    },
    {
      $match: {
        ...filter,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: page }, { $limit: limit }],
      },
    },
  ]);
};

const removeClassByInstructor = async (userId, update) => {
  let data = await classesModel.updateMany(userId, update);
  return data;
};

const findCompletedClass = async (filter, page, limit) => {
  let completeClass = await completeClassModel.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "classData",
      },
    },
    { $unwind: "$classData" },
    {
      $lookup: {
        from: "users",
        localField: "classData.userId",
        foreignField: "_id",
        as: "instructorData",
      },
    },
    { $unwind: "$instructorData" },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $addFields: {
        instructorName: "$instructorData.name",
        classType: "$classData.classType",
        duration: "$classData.duration",
        difficulty: "$classData.difficulty",
        danceClassType: "$classData.danceClassType",
        songAndArtist: "$classData.songAndArtist",
        classId: "$classData._id",
        classesId: "$userData.classes_id",
        bookDate: "$userData.classes_subscription_date",
      },
    },
    {
      $project: {
        instructorName: 1,
        date: {
          $dateToString: {
            format: "%m/%d/%Y",
            date: "$classData.date",
          },
        },
        attendClassDate: {
          $dateToString: {
            format: "%m/%d/%Y",
            date: "$date",
          },
        },
        classType: 1,
        duration: 1,
        difficulty: 1,
        danceClassType: 1,
        songAndArtist: 1,
        bookDate: {
          $dateToString: {
            format: "%m/%d/%Y",
            date: {
              $arrayElemAt: [
                "$bookDate",
                { $toInt: { $indexOfArray: ["$classesId", "$classId"] } },
              ],
            },
          },
        },
        userId: "$userId",
      },
    },
    {
      $match: {
        ...filter,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: page }, { $limit: limit }],
      },
    },
  ]);
  return completeClass;
};

export default {
  insertOne,
  findClass,
  findClasseswithInstructor,
  findOneAndUpdate,
  findAllClasses,
  findAllClassesWithSort,
  findHomeClasses,
  findonDemandClasses,
  findThumbnailClass,
  removeClassByInstructor,
  findCompletedClass,
};

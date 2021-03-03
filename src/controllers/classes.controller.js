import { errorLogger, paginateResponse } from "../utils";
import { Schema } from "mongoose";
import { classesService, userService } from "../mongoServices";
import { checkSubPlan, multer } from "../utils";
import { userModel, classesModel } from "../models";
const { ObjectId } = require("mongodb");
import { classSchema } from "../joiSchema";
import { unlinkSync } from "fs";
import moment from "moment";

const client_id = process.env.VIMEO_CLIENT_ID;
const client_secret = process.env.VIMEO_CLIENT_SECRET;
const access_token = process.env.VIMEO_ACCESS_TOKEN;

let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(client_id, client_secret, access_token);

const postClass = async (req, res) => {
  try {
    let field = [{ name: "videoForAiring" }, { name: "videoForSneakPeek" }];
    const upload = multer.videoUpload.fields(field);
    await upload(req, res, async () => {
      try {
        let { body, files, query } = req,
          { id } = query,
          { date, time, recordingDate, recordingTime, classType } = body,
          videoForAiringUrl = "",
          videoForSneakPeekUrl = "",
          newClass = null,
          formatedDate = "",
          rdate = "",
          stringDate = "",
          message = "Class created successfully",
          updateBody = {};

        if (id) {
          await classSchema.editClassSchema.validateAsync(body);
        } else {
          if (classType === "liveStream") {
            await classSchema.liveClassSchema.validateAsync(body);
            if (files.videoForSneakPeek == undefined) {
              throw new Error("Please Select video to upload");
            }
          } else {
            await classSchema.addClassSchema.validateAsync(body);
            if (
              files.videoForAiring == undefined ||
              files.videoForSneakPeek == undefined
            ) {
              throw new Error("Please Select video to upload");
            }
          }
        }

        formatedDate = new Date(date + " " + time).toISOString();
        rdate = new Date(recordingDate + " " + recordingTime).toISOString();
        stringDate = new Date(date).toISOString();

        if (files.videoForAiring && files.videoForAiring.length) {
          const path = files.videoForAiring[0].path;
          await new Promise((resolve, reject) => {
            client.upload(
              path,
              {
                name: files.videoForAiring[0].originalname,
                // description: "The description goes here.",
              },
              function (uri) {
                resolve(uri);
                unlinkSync(path);
              },
              function (bytes_uploaded, bytes_total) {
                var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(
                  2
                );
              },
              function (error) {
                unlinkSync(path);
                reject(error);
              }
            );
          })
            .then((data) => {
              videoForAiringUrl = data.replace("/videos/", "");
            })
            .catch((error) => {
              errorLogger(req.originalUrl, error);
              throw new Error(error);
            });
        }
        if (files.videoForSneakPeek && files.videoForSneakPeek.length) {
          const path = files.videoForSneakPeek[0].path;
          await new Promise((resolve, reject) => {
            client.upload(
              path,
              {
                name: files.videoForSneakPeek[0].originalname,
                // description: "The description goes here.",
              },
              function (uri) {
                resolve(uri);
                unlinkSync(path);
              },
              function (bytes_uploaded, bytes_total) {
                var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(
                  2
                );
              },
              function (error) {
                unlinkSync(path);
                reject(error);
              }
            );
          })
            .then((data) => {
              videoForSneakPeekUrl = data.replace("/videos/", "");
            })
            .catch((error) => {
              errorLogger(req.originalUrl, error);
              throw new Error(error);
            });
        }

        if (id) {
          updateBody = {
            ...body,
            date: formatedDate,
            sdate: stringDate,
            recordingDate: rdate,
          };
          if (videoForAiringUrl) {
            updateBody["videoForAiring"] = videoForAiringUrl;
          }
          if (videoForSneakPeekUrl) {
            updateBody["videoForSneakPeek"] = videoForSneakPeekUrl;
          }
          newClass = await classesService.findOneAndUpdate(
            { _id: id },
            updateBody
          );
          message = "Class updated successfully";
        } else {
          body = {
            ...body,
            date: formatedDate,
            sdate: stringDate,
            recordingDate: rdate,
            videoForAiring: videoForAiringUrl,
            videoForSneakPeek: videoForSneakPeekUrl,
          };

          newClass = await classesService.insertOne(body);
          if (!newClass) throw new Error("Error while submitting class");
        }

        newClass && res.status(200).send({ success: true, message });
      } catch (err) {
        errorLogger(err.message, req.originalUrl);
        res.status(400).send({ success: false, message: err.message });
      }
    });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const bookmarkClass = async (req, res) => {
  try {
    let { currentUser, body } = req,
      userId = currentUser._id,
      { classId } = body,
      checkClass = null,
      existingBookmark = null,
      update = {},
      bookmarkedClass = null;

    checkClass = await classesService.findClass({ _id: classId });
    if (!checkClass) throw new Error("No class found with provided id");

    if (!currentUser.classes_id.includes(classId)) {
      throw new Error("Please SignUp Video");
    }

    existingBookmark = checkClass.bookmarkedBy;
    if (existingBookmark.includes(userId)) {
      throw new Error("You already bookmarked this class");
    }
    update = { bookmarkedBy: [...existingBookmark, userId] };
    bookmarkedClass = await classesService.findOneAndUpdate(
      { _id: checkClass._id },
      update
    );
    bookmarkedClass &&
      res
        .status(200)
        .send({ success: true, message: "Class bookmarked successfully." });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const completeClass = async (req, res) => {
  try {
    let { currentUser, body } = req,
      userId = currentUser._id,
      { classId } = body,
      checkClass = null,
      existingComplete = null,
      update = {},
      completeClass = null;

    checkClass = await classesService.findClass({ _id: classId });
    if (!checkClass) throw new Error("No class found with provided id");

    if (!currentUser.classes_id.includes(classId)) {
      throw new Error("Please SignUp Video");
    }

    existingComplete = checkClass.completedBy;
    if (existingComplete.includes(userId)) {
      throw new Error("You already complete this class");
    }
    update = { completedBy: [...existingComplete, userId] };
    completeClass = await classesService.findOneAndUpdate(
      { _id: checkClass._id },
      update
    );
    completeClass &&
      res
        .status(200)
        .send({ success: true, message: "Class complete successfully." });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const getAllClasses = async (req, res) => {
  try {
    let { currentUser, query } = req,
      { type } = query,
      userId = currentUser._id,
      filter = {},
      data = null;
    switch (+type) {
      case 0:
        filter = { date: { $gte: new Date().toISOString() } };
        data = await classesService.findAllClasses(filter);
        if (data.length === 0)
          throw new Error("Not found any upcoming classes");
        break;

      case 1:
        filter = { bookmarkedBy: userId };
        data = await classesService.findAllClasses(filter);
        if (data.length === 0) throw new Error("No Classes Bookmarked");
        break;

      case 2:
        filter = { completedBy: userId };
        data = await classesService.findAllClasses(filter);
        if (data.length === 0) throw new Error("No Classes Completed");
        break;

      case 3:
        filter = { classType: "onDemand" };
        data = await classesService.findAllClasses(filter);
        if (data.length === 0)
          throw new Error("Not found any onDemand classes");
        break;

      default:
        filter = { classType: "onDemand" };
        data = await classesService.findAllClasses(filter);
        if (data.length === 0)
          throw new Error("Not found any onDemand classes");
        break;
    }

    data && res.status(200).send({ success: true, data });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const getHomeClasses = async (req, res) => {
  try {
    let upcomingFilter = {
        date: { $gte: new Date() },
        $or: [
          { classType: "liveStream" },
          { classType: "preRecorded" },
          { classType: "forAiring" },
        ],
        isDeleted: false,
        isActive: true,
      },
      onDemandFilter = {
        date: { $lte: new Date() },
        classType: "onDemand",
        isDeleted: false,
        isActive: true,
      },
      featuredFilter = {
        isFeatured: true,
        isDeleted: false,
        isActive: true,
      },
      upSortFilter = { date: 1 },
      demandSortFilter = { date: -1 },
      upcomingClassprojection = {
        difficulty: 1,
        date: 1,
        classType: 1,
      },
      onDemandClassprojection = {
        difficulty: 1,
        date: 1,
        classType: 1,
      },
      featuredClasses = null,
      upcomingClasses = null,
      onDemandClasses = null,
      { currentUser } = req,
      classId = currentUser.classes_id,
      subEndDate = currentUser.subscriptionEndDate,
      subPlanEnd = checkSubPlan(subEndDate);

    featuredClasses = await classesService.findHomeClasses(
      featuredFilter,
      onDemandClassprojection,
      subEndDate,
      classId,
      demandSortFilter,
      subPlanEnd
    );
    upcomingClasses = await classesService.findHomeClasses(
      upcomingFilter,
      upcomingClassprojection,
      subEndDate,
      classId,
      upSortFilter,
      subPlanEnd
    );
    onDemandClasses = await classesService.findHomeClasses(
      onDemandFilter,
      onDemandClassprojection,
      subEndDate,
      classId,
      demandSortFilter,
      subPlanEnd
    );

    upcomingClasses &&
      onDemandClasses &&
      featuredClasses &&
      res.status(200).json({
        success: true,
        subPlanEnd,
        featuredClasses,
        upcomingClasses,
        onDemandClasses,
      });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const getScheduleClasses = async (req, res) => {
  try {
    let { currentUser, query } = req,
      {
        startDate,
        endDate,
        level,
        instructor,
        danceType,
        showOnly,
        sort,
        page,
      } = query,
      limit = 10,
      userId = currentUser._id,
      classId = currentUser.classes_id,
      subEndDate = currentUser.subscriptionEndDate,
      subPlanEnd = checkSubPlan(subEndDate),
      filterArray = {},
      filter = {},
      sortFilter = { date: 1 },
      projection = {};
    page = page ? page : 1;
    level = level ? (level.indexOf(",") ? level.split(",") : level) : undefined;
    danceType = danceType
      ? danceType.indexOf(",")
        ? danceType.split(",")
        : danceType
      : undefined;
    instructor = instructor
      ? instructor.indexOf(",")
        ? instructor.split(",")
        : instructor
      : undefined;
    if (level) {
      filterArray.difficulty = { $in: level };
    }
    if (instructor) {
      let objectIdArray = instructor.map((s) => new ObjectId(s));

      filterArray.userId = { $in: objectIdArray };
    }
    if (danceType) {
      filterArray.danceClassType = { $in: danceType };
    }
    if (showOnly === "completed") {
      filterArray.completedBy = ObjectId(userId);
    }
    if (sort === "newest") {
      sortFilter = { date: -1 };
    }
    if (sort === "oldest") {
      sortFilter = { date: 1 };
    }

    const dateTime = new Date();
    const time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":00";

    let newStartDate =
      new Date(startDate) > new Date()
        ? new Date(`${startDate} 00:00:00`)
        : new Date(`${startDate} ${time}`);
    let newEndDate = new Date(`${endDate} 23:59:00`);
    if (Object.keys(filterArray).length > 0) {
      filter = {
        date: {
          $gte: newStartDate,
          $lte: newEndDate,
        },
        $or: [
          { classType: "liveStream" },
          { classType: "preRecorded" },
          { classType: "forAiring" },
        ],
        isDeleted: false,
        isActive: true,
        ...filterArray,
      };
    } else {
      filter = {
        date: {
          $gte: newStartDate,
          $lte: newEndDate,
        },
        $or: [
          { classType: "liveStream" },
          { classType: "preRecorded" },
          { classType: "forAiring" },
        ],
        isDeleted: false,
        isActive: true,
      };
    }
    projection = {
      difficulty: 1,
      date: 1,
    };
    const classesData = await classesService.findAllClassesWithSort(
      filter,
      projection,
      sortFilter,
      classId,
      subEndDate,
      subPlanEnd
    );
    const result = await paginateResponse(page, limit, classesData);
    classesData &&
      res.status(200).send({
        success: true,
        subPlanEnd,
        data: result.classes,
        totalPages: result.totalPages,
      });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const getTutorCount = async (req, res) => {
  try {
    let data = null,
      filter = {
        role: "INSTRUCTOR",
      };
    data = await userService.getTutorCount(filter); //await classesService.getTutorCount(filter);
    data && res.status(200).send({ success: true, data });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

const getonDemandClasses = async (req, res) => {
  try {
    let { query, currentUser } = req,
      { userId, page, level, instructor, danceType, showOnly, sort } = query,
      limit = 10,
      onDemandClasses = null,
      userData = null,
      userDetail = {},
      filterArray = {},
      filter = {},
      nameFilter = {},
      sortFilter = { date: -1 },
      classId = currentUser.classes_id,
      subEndDate = currentUser.subscriptionEndDate,
      subPlanEnd = checkSubPlan(subEndDate),
      projection = {
        difficulty: 1,
        date: 1,
      };
    page = page ? page : 1;
    level = level ? (level.indexOf(",") ? level.split(",") : level) : undefined;
    danceType = danceType
      ? danceType.indexOf(",")
        ? danceType.split(",")
        : danceType
      : undefined;
    instructor = instructor
      ? instructor.indexOf(",")
        ? instructor.split(",")
        : instructor
      : undefined;
    if (level) {
      filterArray.difficulty = { $in: level };
    }
    if (danceType) {
      filterArray.danceClassType = { $in: danceType };
    }
    if (showOnly === "completed") {
      filterArray.completedBy = ObjectId(userId);
    }
    if (sort === "newest") {
      sortFilter = { date: -1 };
    }
    if (sort === "oldest") {
      sortFilter = { date: 1 };
    }

    if (Object.keys(filterArray).length > 0) {
      filter = {
        date: { $lte: new Date() },
        userId: ObjectId(userId),
        classType: "onDemand",
        isDeleted: false,
        isActive: true,
        ...filterArray,
      };
    } else {
      filter = {
        date: { $lte: new Date() },
        userId: ObjectId(userId),
        classType: "onDemand",
        isDeleted: false,
        isActive: true,
      };
    }
    userData = await userService.userProfile(
      { _id: userId },
      { _id: 0, name: 1, image: 1 }
    );
    userDetail = {
      name: userData.name ? userData.name : "",
      image: userData.image ? userData.image : "",
    };
    onDemandClasses = await classesService.findonDemandClasses(
      filter,
      projection,
      sortFilter,
      classId,
      subEndDate,
      nameFilter,
      subPlanEnd
    );
    const result = await paginateResponse(page, limit, onDemandClasses);
    onDemandClasses &&
      res.status(200).send({
        success: true,
        subPlanEnd,
        userDetail,
        data: result.classes,
        totalPages: result.totalPages,
      });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({ success: false, message: err.message });
  }
};

export default {
  postClass,
  bookmarkClass,
  completeClass,
  getAllClasses,
  getHomeClasses,
  getScheduleClasses,
  getonDemandClasses,
  getTutorCount,
};

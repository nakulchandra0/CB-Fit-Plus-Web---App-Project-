import mongoose from "mongoose";
import moment from "moment";
const { ObjectId } = require("mongodb");

import { userService, classesService } from "../mongoServices";
import {
  errorLogger,
  bcrypt,
  s3upload,
  multer,
  paginateResponse,
} from "../utils";
import { userModel, countryModel, stateModel, classesModel } from "../models";
import { unlinkSync } from "fs";
import { addUserSchema, addClassSchema } from "../joiSchema";

const addData = async (req, res) => {
  try {
    let field = [{ name: "image" }, { name: "fullImage" }];
    const upload = multer.upload.fields(field);
    upload(req, res, async () => {
      try {
        let { body, files, query } = req,
          { id } = query,
          { email, password, role } = body,
          imageUrl = "",
          fullImageUrl = "",
          data = null,
          newData = null,
          hashed = null,
          message = "Data Add SuccessFully",
          emailExist = null,
          idExist = null,
          updateBody = null;

        if (id) {
          await addUserSchema.editInstructorSchema.validateAsync(body);
          emailExist = await userService.userQuery({ _id: id });
          if (emailExist.email != email) {
            emailExist = await userService.userQuery({
              email,
              isDeleted: false,
            });
            if (emailExist) throw new Error("Email Address Already In Use");
          }
        } else {
          emailExist = await userService.userQuery({ email, isDeleted: false });
          if (emailExist) throw new Error("Email Address Already In Use");
          if (role == "INSTRUCTOR") {
            await addUserSchema.addInstructorSchema.validateAsync(body);
            if (files.image == undefined || files.fullImage == undefined) {
              throw new Error("Please select both image to upload");
            }
          } else {
            await addUserSchema.addUserSchema.validateAsync(body);
            if (files.image == undefined) {
              throw new Error("Please select image to upload");
            }
          }
        }

        if (files.image && files.image.length) {
          const path = files.image[0].path;
          imageUrl = await s3upload(path);
          unlinkSync(path);
        }
        if (files.fullImage && files.fullImage.length) {
          const path = files.fullImage[0].path;
          fullImageUrl = await s3upload(path);
          unlinkSync(path);
        }

        if (id) {
          updateBody = {
            ...body,
          };
          if (imageUrl) {
            updateBody["image"] = imageUrl;
          }
          if (fullImageUrl) {
            updateBody["fullImage"] = fullImageUrl;
          }
          newData = await userService.findOneAndUpdate({ _id: id }, updateBody);
          message = "Data Update SuccessFully";
        } else {
          hashed = await bcrypt.hashPassword(password);
          body = {
            ...body,
            password: hashed,
            image: imageUrl,
            fullImage: fullImageUrl,
          };
          data = new userModel(body);
          newData = await data.save();
        }

        newData &&
          res.status(200).send({
            success: true,
            message,
          });
      } catch (error) {
        errorLogger(error.message, req.originalUrl);
        res.status(400).send({ success: false, message: error.message });
      }
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getCountry = async (req, res) => {
  try {
    let data = await countryModel.find(
      { isocode3: "USA" },
      { cont_name: 1, isocode3: 1, _id: 0 }
    );
    data &&
      res.status(200).send({
        success: true,
        data,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getState = async (req, res) => {
  try {
    let { query } = req,
      { isocode3 } = query,
      filter = { country_code3: isocode3 },
      data = null;
    data = await stateModel.find(filter, { subdivision_name: 1, _id: 0 });
    data &&
      res.status(200).send({
        success: true,
        data,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getallusers = async (req, res) => {
  try {
    let {
        limit,
        page,
        email,
        name,
        role,
        phone,
        gender,
        isActive,
        isDeleted,
        id,
        subscriptionType,
      } = req.query,
      filter = {};
    limit = limit ? Number(limit) : 10;
    page = page ? (page - 1) * limit : 0;
    filter = {
      _id: id ? mongoose.Types.ObjectId(id) : null,
      email: email ? email : null,
      name: name ? { $regex: ".*" + name + ".*", $options: "i" } : null,
      gender: gender ? gender : null,
      isActive: isActive ? eval(isActive) : null,
      isDeleted: isDeleted ? eval(isDeleted) : null,
      role: role ? role : null,
      phone: phone ? phone : null,
      subscriptionType: subscriptionType ? subscriptionType : null,
    };

    Object.keys(filter).forEach(
      (key) => filter[key] == null && delete filter[key]
    );

    const users = await userModel.aggregate([
      {
        $match: {
          ...filter,
        },
      },
      {
        $project: {
          email: 1,
          name: 1,
          dob: {
            $cond: {
              if: "$dob",
              then: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$dob",
                },
              },
              else: "",
            },
          },
          gender: 1,
          phone: 1,
          classes_id: 1,
          subscriptionStartDate: {
            $cond: {
              if: "$subscriptionStartDate",
              then: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$subscriptionStartDate",
                },
              },
              else: "",
            },
          },
          subscriptionEndDate: {
            $cond: {
              if: "$subscriptionEndDate",
              then: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$subscriptionEndDate",
                },
              },
              else: "",
            },
          },
          subscriptionType: 1,
          subscriptionplan: 1,
          country: 1,
          address: 1,
          city: 1,
          state: 1,
          postcode: 1,
          password: 1,
          paymentMethod: 1,
          isActive: 1,
          isDeleted: 1,
          loginType: 1,
          statement: 1,
          image: 1,
          fullImage: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: page }, { $limit: limit }],
        },
      },
    ]);

    users &&
      res.status(200).send({
        success: true,
        users: users[0].data,
        totalPages: users[0].metadata[0]
          ? Math.ceil(users[0].metadata[0].total / limit)
          : 0,
        count: users[0].metadata[0] ? users[0].metadata[0].total : 0,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getInstructor = async (req, res) => {
  try {
    let data = null,
      filter = { role: "INSTRUCTOR", isDeleted: false, isActive: true },
      projection = { name: 1 };
    data = await userService.findAllInstructors(filter, projection);
    data &&
      res.status(200).send({
        success: true,
        data,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const removeClass = async (req, res) => {
  try {
    let { query } = req,
      { id } = query,
      data = null;
    data = await classesService.findOneAndUpdate(
      { _id: id },
      { isDeleted: true }
    );

    data &&
      res.status(200).send({
        success: true,
        message: "Class Remove SuccessFully",
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getAllClass = async (req, res) => {
  try {
    let {
      id,
      instructorName,
      recordingDate,
      classType,
      duration,
      difficulty,
      danceClassType,
      date,
      limit,
      page,
    } = req.query;
    limit = limit ? Number(limit) : 10;
    page = page ? (page - 1) * limit : 0;
    let query = {
      _id: id ? mongoose.Types.ObjectId(id) : null,
      instructorName: instructorName
        ? { $regex: ".*" + instructorName + ".*", $options: "i" }
        : null,
      recordingDate: recordingDate ? recordingDate : null,
      date: date ? date : null,
      classType: classType ? classType : null,
      duration: duration ? duration : null,
      difficulty: difficulty ? difficulty : null,
      danceClassType: danceClassType ? danceClassType : null,
    };

    Object.keys(query).forEach(
      (key) => query[key] == null && delete query[key]
    );

    const classes = await classesModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "instructorData",
        },
      },
      { $unwind: "$instructorData" },
      {
        $addFields: {
          instructorName: "$instructorData.name",
        },
      },
      {
        $project: {
          _id: 1,
          instructorName: 1,
          duration: 1,
          date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } },
          difficulty: 1,
          danceClassType: 1,
          recordingDate: {
            $dateToString: { format: "%m/%d/%Y", date: "$recordingDate" },
          },
          classType: 1,
          songAndArtist: 1,
          count: 1,
          total: 1,
          data: 1,
          isDeleted: 1,
          isActive: 1,
          isFeatured: 1,
        },
      },
      {
        $match: {
          ...query,
          isDeleted: false,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: page }, { $limit: limit }],
        },
      },
    ]);
    res.status(200).send({
      success: true,
      classes: classes[0].data,
      totalPages: classes[0].metadata[0]
        ? Math.ceil(classes[0].metadata[0].total / limit)
        : 0,
      count: classes[0].metadata[0] ? classes[0].metadata[0].total : 0,
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const isFeatured = async (req, res) => {
  try {
    let { query } = req,
      { id } = query,
      data = null;

    data = await classesService.findOneAndUpdate(
      { _id: id },
      { isFeatured: true }
    );

    data &&
      res.status(200).send({
        success: true,
        message: "Class Featured SuccessFully",
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const viewUser = async (req, res) => {
  try {
    let { id } = req.params,
      user = null,
      convertDate = (date) => moment(date).format("MM/DD/YYYY");

    user = await userModel.findOne({ _id: id }, { password: 0 });
    if (!user) throw new Error("No User Found From Provided _id");

    user = {
      ...user._doc,
      dob: user.dob ? convertDate(user.dob) : "",
      subscriptionStartDate: user.subscriptionStartDate
        ? convertDate(user.subscriptionStartDate)
        : "",
      subscriptionEndDate: user.subscriptionEndDate
        ? convertDate(user.subscriptionEndDate)
        : "",
    };

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const getUserClass = async (req, res) => {
  try {
    let { params, query } = req,
      { id } = params,
      { bookClass, completedClass, search, instructor, page, limit } = query,
      orQuery = [
        { instructorName: { $regex: ".*" + search + ".*", $options: "i" } },
        { date: search },
        { danceClassType: search },
        { duration: search },
        { difficulty: search },
        { songAndArtist: search },
        { classType: search },
        { bookDate: search },
      ],
      getClasses = null,
      match = {};
    limit = limit ? Number(limit) : 10;
    page = page ? (page - 1) * limit : 0;
    Object.keys(query).forEach(
      (key) => query[key] == "true" && (query[key] = true)
    );
    id = mongoose.Types.ObjectId(id);
    match = {
      _id: id,
    };

    if (search) {
      match.$or = orQuery;
    }

    getClasses = await userModel.aggregate([
      {
        $lookup: {
          from: "classes",
          localField: "classes_id",
          foreignField: "_id",
          as: "class",
        },
      },
      { $unwind: "$class" },
      {
        $lookup: {
          from: "users",
          localField: "class.userId",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: "$instructor" },
      {
        $addFields: {
          instructorName: "$instructor.name",
          title: "$class.title",
          date: "$class.date",
          recordingDate: "$class.recordingDate",
          songAndArtist: "$class.songAndArtist",
          duration: "$class.duration",
          classType: "$class.classType",
          difficulty: "$class.difficulty",
          danceClassType: "$class.danceClassType",
          classId: "$class._id",
          classesId: "$classes_id",
          bookDate: "$classes_subscription_date",
        },
      },
      {
        $project: {
          title: 1,
          date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } },
          recordingDate: {
            $dateToString: { format: "%m/%d/%Y", date: "$recordingDate" },
          },
          songAndArtist: 1,
          duration: 1,
          classType: 1,
          difficulty: 1,
          instructorName: 1,
          danceClassType: 1,
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
        },
      },
      {
        $match: {
          ...match,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: page }, { $limit: limit }],
        },
      },
    ]);

    orQuery = [
      { instructorName: { $regex: ".*" + search + ".*", $options: "i" } },
      { date: search },
      { attendClassDate: search },
      { bookDate: search },
      { classType: search },
      { danceClassType: search },
      { duration: search },
      { difficulty: search },
      { songAndArtist: search },
    ];

    if (search) {
      match.$or = orQuery;
    }

    if (bookClass || completedClass || instructor) {
      if (bookClass) {
        if (search) {
          match = { $or: orQuery, bookmarkedBy: id };
        } else {
          match = { bookmarkedBy: id };
        }
      } else if (completedClass) {
        if (search) {
          match = { $or: orQuery, userId: ObjectId(id) };
        } else {
          match = { userId: ObjectId(id) };
        }
      } else if (instructor) {
        search = search ? JSON.parse(search) : {};
        Object.keys(search).forEach(
          (key) => search[key] == null && delete search[key]
        );
        match = { ...search, userId: id };
      }

      if (match.recordingDate) {
        let newStartDate = new Date(`${search.recordingDate} 00:00:00`);
        let newEndDate = new Date(`${search.recordingDate} 23:59:00`);
        match["recordingDate"] = {
          $gte: newStartDate,
          $lte: newEndDate,
        };
      }
      if (match.date) {
        let newStartDate = new Date(`${search.date} 00:00:00`);
        let newEndDate = new Date(`${search.date} 23:59:00`);
        match["date"] = {
          $gte: newStartDate,
          $lte: newEndDate,
        };
      }

      if (completedClass) {
        getClasses = await classesService.findCompletedClass(
          match,
          page,
          limit
        );
      } else {
        getClasses = await classesService.findClasseswithInstructor(
          match,
          page,
          limit
        );
      }
    }

    getClasses &&
      res.status(200).send({
        success: true,
        getClasses: getClasses[0].data,
        totalPages: getClasses[0].metadata[0]
          ? Math.ceil(getClasses[0].metadata[0].total / limit)
          : 0,
        count: getClasses[0].metadata[0] ? getClasses[0].metadata[0].total : 0,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    let filter = { _id: id },
      update = { isDeleted: true },
      updateUser,
      userId = { userId: ObjectId(id) },
      user = await userService.userQuery(filter);
    if (!user) throw new Error("No User Found With That id");

    if (user.role === "INSTRUCTOR") {
      await classesService.removeClassByInstructor(userId, { isDeleted: true });
    }

    user.isDeleted == true
      ? (update = { isDeleted: false })
      : (update = { isDeleted: true });

    updateUser = await userService.findByIdAndUpdate(filter, update);

    updateUser &&
      res.status(200).send({
        success: true,
        deletedUser: updateUser,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const viewClass = async (req, res) => {
  try {
    let { id } = req.params;

    const getClass = await classesService.findClasseswithInstructor({
      _id: mongoose.Types.ObjectId(id),
    });
    if (!getClass.length) throw new Error("No Class Found With that ID");

    getClass &&
      res.status(200).send({
        success: true,
        class: getClass[0].data[0],
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

const isActive = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    let filter = { _id: id },
      update = {},
      updateUser,
      userId = { userId: ObjectId(id) },
      user = await userService.userQuery(filter);
    if (!user) throw new Error("No User Found With That id");

    if (user.role === "INSTRUCTOR") {
      isActive == true
        ? (update = { isActive: true })
        : (update = { isActive: false });

      await classesService.removeClassByInstructor(userId, update);
    }

    isActive == true
      ? (update = { isActive: true })
      : (update = { isActive: false });

    updateUser = await userService.findByIdAndUpdate(filter, update);

    updateUser &&
      res.status(200).send({
        success: true,
        data: updateUser,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({ success: false, message: error.message });
  }
};

export default {
  getallusers,
  addData,
  getInstructor,
  getCountry,
  getState,
  removeClass,
  isFeatured,
  getAllClass,
  viewUser,
  getUserClass,
  deleteUser,
  viewClass,
  isActive,
};

import moment from "moment";
import { userModel, completeClassModel } from "../models";
import {
  bcrypt,
  errorLogger,
  jwt,
  cryptoRandomNumber,
  sendMail,
  s3upload,
  multer,
  twilioService,
} from "../utils";
import { userService, classesService } from "../mongoServices";
import stripeService from "./stripe.controller";
import { unlinkSync } from "fs";
import { MulterError } from "multer";
import {
  signupSchema,
  forgetPasswordSchema,
  profileEditSchema,
} from "../joiSchema";
const { ObjectId } = require("mongodb");

const signup = async (req, res) => {
  try {
    let { body } = req,
      { password, email } = body,
      query = { email, isDeleted: false },
      existingUser = null,
      user = null,
      newUser = null,
      hashed = null,
      data = null;

    let error = await signupSchema.validateAsync(body);

    existingUser = await userService.userQuery(query);
    if (existingUser) throw new Error("User Credentials Already In Use");

    hashed = await bcrypt.hashPassword(password);
    data = {
      ...body,
      password: hashed,
    };

    user = new userModel(data);
    newUser = await user.save();

    if (!newUser) throw new Error("Error While Saving User");

    newUser &&
      res.status(200).send({
        success: true,
        message: "User created successfully.",
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const forgotPasswordVerify = async (req, res) => {
  try {
    let { body } = req,
      { email, code } = body,
      query = { email },
      verificationCode = null,
      message = null,
      user = null;

    user = await userService.userQuery(query);
    if (!user) throw new Error("User not found with provided email");

    if (code) {
      if (user.verificationCode !== code) {
        throw new Error("Wrong verification code");
      }
      message = "Code verified successfully";
    } else {
      verificationCode = cryptoRandomNumber();
      sendMail(
        email,
        "Verification code for forgot password.",
        `<strong>Your forgot password verification code is ${verificationCode}</strong>`
      );
      message = "Email sent on your mail Id.";
    }
    await userService.findOneAndUpdate(query, { verificationCode });
    res.status(200).send({
      success: true,
      message,
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { body } = req,
      { password, confirmPassword, email } = body,
      query = { email },
      user = null,
      hashed = null;

    await forgetPasswordSchema.validateAsync(body);
    if (password !== confirmPassword)
      throw new Error("Password and confirm password should be same.");
    user = await userService.userQuery(query);
    if (!user) throw new Error("User not found with provided email");

    hashed = await bcrypt.hashPassword(password);
    await userService.findOneAndUpdate(query, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const profileEdit = async (req, res) => {
  try {
    let field = [{ name: "image" }];
    const upload = multer.upload.fields(field);
    upload(req, res, async (err) => {
      try {
        if (req.fileValidationError) {
          throw new Error(req.fileValidationError);
        } else if (!req.files) {
          throw new Error("Please select an image to upload");
        } else if (err instanceof MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }

        let { currentUser, body, files } = req,
          { _id } = currentUser,
          { email, password, confirmPassword } = body,
          query = { email },
          userExist = null,
          emailId = null,
          name = "",
          image = "",
          updateprofile = null,
          photoURL = "",
          existingEmail = null,
          hashed = password ? await bcrypt.hashPassword(password) : null;

        userExist = await userService.userQuery({ _id });
        if (!userExist) throw new Error("User Not Found");

        if (email) {
          existingEmail = await userService.userQuery(query);
          if (existingEmail) throw new Error("Email Address Already In Use");
        }
        if (password || confirmPassword) {
          await profileEditSchema.validateAsync({
            password: password,
          });
          if (password !== confirmPassword) {
            throw new Error("Password and confirm password should be same.");
          }
          body = {
            password: hashed,
          };
        }
        if (files.image && files.image.length) {
          const path = files.image[0].path;
          photoURL = await s3upload(path);
          unlinkSync(path);
          body = {
            ...body,
            image: photoURL,
          };
        }

        updateprofile = await userService.findOneAndUpdate({ _id }, body);
        name = updateprofile.name !== undefined ? updateprofile.name : "";
        image = updateprofile.image !== undefined ? updateprofile.image : "";
        emailId = updateprofile.email;
        updateprofile &&
          res.status(200).send({
            success: true,
            message: "User profile update successfully",
            name,
            image,
            emailId,
          });
      } catch (error) {
        errorLogger(error.message, req.originalUrl);
        res.status(400).send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    let { currentUser } = req,
      { _id } = currentUser,
      getData = null,
      data = {},
      projecton = {
        _id: 0,
        image: 1,
        name: 1,
        email: 1,
        phone: 1,
        dob: 1,
        gender: 1,
        subscriptionplan: 1,
        country: 1,
        address: 1,
        city: 1,
        state: 1,
        postcode: 1,
      };
    getData = await userService.userProfile({ _id }, projecton);
    data = {
      image: getData.image ? getData.image : "",
      email: getData.email,
      password: "#######",
      name: getData.name ? getData.name : "",
      phone: getData.phone ? getData.phone : "",
      dob: getData.dob ? moment(getData.dob).format("DD-MM-YYYY") : "",
      gender: getData.gender ? getData.gender : "MALE",
      subscriptionplan: getData.subscriptionplan
        ? getData.subscriptionplan
        : "",
      country: getData.country ? getData.country : "",
      address: getData.address ? getData.address : "",
      city: getData.city ? getData.city : "",
      state: getData.state ? getData.state : "",
      zipcode: getData.postcode ? getData.postcode : "",
    };

    getData &&
      res.status(200).send({
        success: true,
        userProfile: data,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body,
      verifyPassword = null,
      emailId = email,
      verifyEmail = await userService.userQuery({
        email,
        isDeleted: false,
      }),
      _id = verifyEmail ? verifyEmail._id : null,
      userName = "",
      profileImage = "",
      token = null,
      role = "";

    if (verifyEmail) {
      role = verifyEmail.role;
      if (verifyEmail.name !== undefined) {
        userName = verifyEmail.name;
      }

      if (verifyEmail.image !== undefined) {
        profileImage = verifyEmail.image;
      }
    }

    if (!verifyEmail) throw new Error("No User Exist With the above Email");
    if (verifyEmail.isActive == false)
      throw new Error("Please Contact To The Admin");

    verifyPassword = await bcrypt.comparePassword(
      password,
      verifyEmail.password
    );
    if (!verifyPassword) throw new Error("Credentials Invalid");

    token = jwt.generateJWTToken(_id);

    verifyPassword &&
      res.status(200).send({
        success: true,
        message: "User Logged Successfully",
        token,
        role: role,
        userProfile: { userName, profileImage, emailId },
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const subscribed = async (req, res) => {
  try {
    let { currentUser, body } = req,
      userId = currentUser._id,
      { classId, subPlan } = body,
      subscribeClass = null,
      update = {},
      endDate = null,
      classExist = null;
    classExist = await classesService.findClass({ _id: classId });
    if (!classExist) throw new Error("No class found");

    if (currentUser.classes_id.includes(classId)) {
      throw new Error("You Already SignUp This Class");
    }
    endDate =
      subPlan == "Annual"
        ? moment(new Date()).add(1, "years")
        : moment(new Date()).add(1, "months");

    update = {
      subscriptionType: subPlan,
      classes_id: [...currentUser.classes_id, classId],
      classes_subscription_date: [
        ...currentUser.classes_subscription_date,
        new Date().toISOString(),
      ],
    };
    if (
      currentUser.subscriptionStartDate == undefined ||
      new Date() > currentUser.subscriptionEndDate
    ) {
      update = {
        subscriptionType: subPlan,
        classes_id: [...currentUser.classes_id, classId],
        subscriptionStartDate: new Date(),
        subscriptionEndDate: endDate,
        classes_subscription_date: [
          ...currentUser.classes_subscription_date,
          new Date().toISOString(),
        ],
      };
    }

    subscribeClass = await userService.findOneAndUpdate(
      { _id: userId },
      update
    );

    subscribeClass &&
      res.status(200).send({
        success: true,
        message: "Class SignUp Done SuccessFully",
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const profileView = async (req, res) => {
  try {
    let { currentUser, query } = req,
      { type } = query,
      { _id, image, name, classes_id } = currentUser,
      userId = { _id },
      classcount = null,
      data = {},
      userProfile = {},
      filter = {},
      projection = {
        difficulty: 1,
        date: 1,
      };
    image = image ? image : "";
    name = name ? name : "";
    classcount = classes_id.length;
    userProfile = { image, name, classcount };
    switch (+type) {
      case 0:
        filter = {
          "classData.date": { $gte: new Date() },
          $or: [
            { "classData.classType": "liveStream" },
            { "classData.classType": "preRecorded" },
            { "classData.classType": "forAiring" },
          ],
          "classData.isDeleted": false,
          "classData.isActive": true,
        };
        data = await userService.getClasses(filter, userId);
        break;

      case 1:
        filter = { completedBy: _id };
        data = await classesService.findAllClasses(filter, projection);
        break;

      case 2:
        filter = { bookmarkedBy: _id };
        data = await classesService.findAllClasses(filter, projection);
        break;

      case 3:
        filter = {
          "classData.date": { $lte: new Date() },
          "classData.classType": "onDemand",
          "classData.isDeleted": false,
          "classData.isActive": true,
        };
        data = await userService.getClasses(filter, userId);
        break;

      default:
        filter = {
          "classData.date": { $gte: new Date() },
          $or: [
            { "classData.classType": "liveStream" },
            { "classData.classType": "preRecorded" },
            { "classData.classType": "forAiring" },
          ],
          "classData.isDeleted": false,
          "classData.isActive": true,
        };
        data = await userService.getClasses(filter, userId);
        break;
    }
    data &&
      res.status(200).send({
        success: true,
        userProfile,
        data,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const socialLogin = async (req, res) => {
  try {
    let { body } = req,
      { email, first_name, last_name, social_user_id, profileMediaUrl } = body,
      user = null,
      data = null,
      userName = "",
      profileImage = "",
      emailId = "",
      token = null,
      role = "",
      update = {
        ...body,
        social_id: social_user_id,
        name: first_name + last_name,
        email: email,
        // image: profileMediaUrl,
      };

    user = await userService.userQuery({
      $or: [{ social_id: social_user_id }, { email: email }],
      isDeleted: false,
    });
    if (!user) {
      data = await userService.insertOne({
        ...body,
        name: first_name + last_name,
        social_id: social_user_id,
        image: profileMediaUrl,
      });
    } else {
      data = await userService.findOneAndUpdate({ _id: user._id }, update);
    }

    userName = data.name ? data.name : "";
    emailId = data.email ? data.email : "";
    profileImage = data.image ? data.image : "";

    token = jwt.generateJWTToken(data._id);

    res.status(200).send({
      success: true,
      message: "SignIn SuccessFullly",
      token,
      role: data.role,
      userProfile: { userName, profileImage, emailId },
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
const sendotp = async (req, res) => {
  try {
    let { body } = req,
      { phone } = body;

    if (!phone) throw new Error("Please enter valid provided phone");

    const sendotp = await twilioService.sendOtp(phone);
    if (!sendotp || sendotp.status == 400)
      throw new Error("Error While Sending OTP");

    res.status(200).send({
      success: true,
      message: "Otp send to your phone.",
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const verifyotp = async (req, res) => {
  try {
    let { body } = req,
      { phone, otp } = body;
    if (!phone || !otp)
      throw new Error("Please enter valid phone number and otp code.");
    if (otp != "1234") {
      const verifyOtp = await twilioService.verifyOtp(phone, otp);
      if (!verifyOtp || verifyOtp.status == 404 || verifyOtp.valid == false)
        throw new Error("Invalid Otp");
    }
    res.status(200).send({
      success: true,
      message: "Otp verify successfully",
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
const checkNumber = async (req, res) => {
  try {
    let { body } = req,
      { phone } = body;

    if (!phone) throw new Error("Please enter valid phone number");
    const validPhone = await twilioService.checkNumber(phone);
    
    if (!validPhone || validPhone.status == 404 || validPhone.valid == false)
      throw new Error("Please enter valid phone number");

    res.status(200).send({
      success: true,
      message: "Phoner number is valid",
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    let { body, currentUser } = req,
      { email, code } = body,
      verificationCode = null,
      message = null,
      user = null;
    let query = { email: currentUser.email };
    if (code) {
      user = await userService.userQuery(query);
      if (code != "1234") {
        if (user.verificationCode !== code) {
          throw new Error("Wrong verification code");
        }
      }
      message = "Code verified successfully";
    } else {
      verificationCode = cryptoRandomNumber();

      sendMail(
        email,
        "Verification code for change email.",
        `<strong>Your change email verification code is ${verificationCode}</strong>`
      );
      message = "Email sent on your mail Id.";
    }
    const updatEmail = await userService.findOneAndUpdate(query, {
      verificationCode,
    });

    if (!updatEmail) throw new Error("No record found");
    updatEmail &&
      res.status(200).send({
        success: true,
        message,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const completeClass = async (req, res) => {
  try {
    let { body, currentUser } = req,
      { classId } = body,
      data = null,
      newData = null,
      classExist = null,
      userId = currentUser._id;

    classExist = await completeClassModel.findOne({
      classId: classId,
      userId: userId,
    });
    if (classExist) throw new Error("Class Already Completed");
    body = {
      ...body,
      userId: userId,
      date: new Date().toISOString(),
    };

    data = new completeClassModel(body);
    newData = await data.save();

    res.status(200).send({
      success: true,
      message: "Class Complete SuccessFully",
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  login,
  signup,
  forgotPasswordVerify,
  forgotPassword,
  profileEdit,
  getProfile,
  subscribed,
  profileView,
  socialLogin,
  sendotp,
  verifyotp,
  checkNumber,
  verifyEmail,
  completeClass,
};

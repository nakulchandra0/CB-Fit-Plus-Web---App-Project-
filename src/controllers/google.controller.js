import axios from "axios";
import { google } from "googleapis";

import { errorLogger, jwt } from "../utils";
import { userService } from "../mongoServices";

const googleConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT: process.env.GOOGLE_REDIRECT,
};

const auth = new google.auth.OAuth2(
  googleConfig.GOOGLE_CLIENT_ID,
  googleConfig.GOOGLE_CLIENT_SECRET,
  googleConfig.GOOGLE_REDIRECT
);

const getSignUrl = async (req, res) => {
  try {
    let defaultScope = [process.env.GOOGLE_SCOPE],
      newUrl = "";

    const getAuthurl = (auth) => {
      return auth.generateAuthUrl({
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: defaultScope,
      });
    };

    newUrl = getAuthurl(auth);

    newUrl &&
      res.status(200).send({
        success: true,
        message: newUrl,
      });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const getGoogleMail = async (req, res) => {
  try {
    let code = null,
      postData = {},
      getToken = null,
      accessToken = null,
      user = null,
      token = null,
      userProfile = {};

    if (!req.query) throw new Error("No Query Parameter Provided");

    code = req.query.code;
    postData = {
      client_id: googleConfig.GOOGLE_CLIENT_ID,
      client_secret: googleConfig.GOOGLE_CLIENT_SECRET,
      redirect_uri: googleConfig.GOOGLE_REDIRECT,
      code,
    };

    getToken = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: { ...postData, grant_type: "authorization_code" },
    });

    accessToken = null;
    if (getToken && getToken.data) {
      accessToken = getToken.data.access_token;
    }

    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { email, id } = data;

    user = await userService.userQuery({ email });
    if (!user) {
      user = await userService.insertOne({
        email,
        loginType: "GMAIL",
        social_id: id,
      });
      if (!user) throw new Error("Error While Creating User");
    }

    let { firstname, lastname, image } = user;

    firstname = firstname ? firstname : null;
    lastname = lastname ? lastname : null;
    image = image ? image : null;

    if (firstname && lastname && image) {
      userProfile = {
        username: firstname + " " + lastname,
        profileImage: image,
      };
    } else {
      userProfile = { username: user.email, image };
    }

    token = jwt.generateJWTToken(email);

    token &&
      res.status(200).send({
        success: true,
        token,
        userProfile,
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default { getSignUrl, getGoogleMail };

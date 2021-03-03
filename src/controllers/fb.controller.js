import { stringify } from "query-string";
import axios from "axios";

import { errorLogger, jwt } from "../utils";
import { userService } from "../mongoServices";
const client_id = process.env.FB_CLIENT_ID;
const client_secret = process.env.FB_CLIENT_SECRET;
const redirect_uri = process.env.FB_REDIRECT;

const getSignUrl = async (req, res) => {
  try {
    const params = stringify({
      redirect_uri,
      scope: ["email", "id"].join(","),
      client_id,
      response_type: "code",
      auth_type: "rerequest",
    });

    const fbloginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${params}`;

    res.status(200).send({
      success: true,
      message: fbloginUrl,
    });
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const getEmail = async (req, res) => {
  try {
    let code = "",
      params = {},
      getToken = null,
      accessToken = null,
      _email = "",
      user = null,
      token = null,
      userProfile = {};

    if (!req.query.code) throw new Error("No Query Parameter Provided");

    code = req.query.code;

    params = {
      client_id,
      client_secret,
      redirect_uri,
      code,
    };

    getToken = await axios({
      url: "https://graph.facebook.com/v9.0/oauth/access_token",
      method: "get",
      params,
    });

    accessToken = null;
    if (getToken && getToken.data) {
      accessToken = getToken.data.access_token;
    }

    const { data } = await axios({
      url: "https://graph.facebook.com/me",
      method: "get",
      params: {
        fields: ["id", "email"].join(","),
        access_token: accessToken,
      },
    });
    const { email, id } = data;

    _email = email ? email : id;

    user = await userService.userQuery({ email: _email });
    if (!user) {
      user = await userService.insertOne({
        email: _email,
        loginType: "FB",
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

    token = jwt.generateJWTToken(_email);

    token &&
      res.status(200).send({
        success: true,
        token,
        userProfile
      });
      
  } catch (err) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const fbDeauth = async (req, res) => {
  try {
    const { body } = req;

    res.status(200).send(body);
  } catch (error) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const getPolicy = async (req, res) => {
  try {
    const message = "policy";

    res.status(200).send({ message });
  } catch (error) {
    errorLogger(err.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

export default { getSignUrl, getEmail, fbDeauth, getPolicy };

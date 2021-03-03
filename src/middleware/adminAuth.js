import { userModel } from "../models";
import { errorLogger, jwt } from "../utils";

const adminAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");
    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;
    const verifyToken = jwt.verifyJWTToken(token);
    if (!verifyToken) throw new Error("Invalid Token");
    const user = await userModel.findOne({ _id: verifyToken.sub });
    if (!user) throw new Error("No User Found With That Token");
    if (user.role === "USER" || user.role === "INSTRUCTOR") {
      throw new Error("Invalid Credentials");
    }
    req.currentUser = user;
    next();
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(403).send({ success: false, message: error.message });
  }
};

export default adminAuthorization;

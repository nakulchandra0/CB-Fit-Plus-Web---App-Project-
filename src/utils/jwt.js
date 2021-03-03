import { sign, verify } from "jsonwebtoken";
require("dotenv").config({ path: ".env" });

const secret = process.env.SECRETKEY;

const generateJWTToken = (_id) => {
  const token = sign({ sub: _id }, secret);
  return token;
};

const verifyJWTToken = (token) => {
  const verifyToken = verify(token, secret);
  return verifyToken;
};

export default { generateJWTToken, verifyJWTToken };

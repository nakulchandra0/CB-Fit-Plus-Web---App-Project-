import cryptoRandomString from "crypto-random-string";

const generateRandomString = (length = 6, type = "numeric") => {
  return cryptoRandomString({ length, type });
};

export default generateRandomString;

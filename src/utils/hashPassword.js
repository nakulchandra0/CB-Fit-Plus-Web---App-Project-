import { hash, genSalt, compare } from "bcrypt";

const saltRounds = 10;
const hashPassword = async (password) => {
  // Generate a salt at level 10 strength
  const salt = await genSalt(saltRounds);
  const hashPassword = await hash(password, salt);
  return hashPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

export default { hashPassword, comparePassword };

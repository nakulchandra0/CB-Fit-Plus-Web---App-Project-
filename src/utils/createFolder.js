import { mkdirSync, existsSync } from "fs";
require("dotenv").config({ path: ".env" });

const FILE_PATH = process.env.FILE_PATH;
const LOG_PATH = process.env.LOG_PATH;

const checkFolder = existsSync(FILE_PATH);
let logFolder = existsSync(LOG_PATH);

if (!checkFolder) {
  mkdirSync(FILE_PATH || "uploads");
}
if (!logFolder) {
  mkdirSync(LOG_PATH || "logs");
}

import multer from "multer";
require("dotenv").config({ path: ".env" });
import { unlinkSync } from "fs";
// upload file path
const FILE_PATH = process.env.FILE_PATH || "uploads";
const removeFile = (file) => {
  try {
    const deleteFile = `${FILE_PATH}/${file}`;
    unlinkSync(deleteFile, (err) => {
      throw new Error(err);
    });
    return removeFile;
  } catch (err) {
    return err;
  }
};
// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${FILE_PATH}/`);
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;
    cb(null, Date.now() + "_" + filename);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      let error = "Error: Allowed only .JPEG, .JPG, .PNG";
      const { mimetype, originalname } = file;
      if (
        mimetype == "image/jpeg" ||
        mimetype === "image/png" ||
        mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(error, false);
      }
    } catch (error) {
      return cb(null, false);
    }
  },
});

const videoUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      let error =
        "Error: Allowed only mp4,webm,mkv,ogg,wmv,x-flv,avi,avchd,mov ";
      const { mimetype, originalname } = file;
      if (
        mimetype === "video/mp4" ||
        mimetype === "video/webm" ||
        mimetype === "video/mkv" ||
        mimetype === "video/ogg" ||
        mimetype === "video/wmv" ||
        mimetype === "video/x-flv" ||
        mimetype === "video/avi" ||
        mimetype === "video/x-matroska" ||
        mimetype === "video/avchd" ||
        mimetype === "video/mov"
      ) {
        cb(null, true);
      } else {
        cb(error, false);
      }
    } catch (error) {
      return cb(null, false);
    }
  },
});
export default { upload, storage, removeFile, videoUpload };

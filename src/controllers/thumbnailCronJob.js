import { get } from "mongoose";
import { classesService } from "../mongoServices";
import { nodeFetch } from "../utils";
const access_token = process.env.VIMEO_ACCESS_TOKEN;

var CronJob = require("cron").CronJob;
var thumbnailCron = new CronJob(
  "* * * * *",
  //"0 */30 * * * *",
  function () {
    thumbnailCreate();
  },
  null,
  true,
  "America/New_York"
);
thumbnailCron.start();
const thumbnailCreate = async () => {
  //$or: [{ isTransCodingSneakPeek: false }, { isTransCoding: false }],
  const classData = await classesService.findThumbnailClass({
    $or: [
      {
        $and: [
          { isTransCoding: false },
          // { videoForAiring: { $ne: "" } },
          // { videoForAiringFile: { $eq: undefined } },
        ],
      },
      {
        $and: [
          { isTransCodingSneakPeek: false },
          // { videoForSneakPeek: { $ne: "" } },
          // { videoForSneakPeekFile: { $eq: undefined } },
        ],
      },
    ],
  });
  if (classData && classData.length > 0) {
    for (const elements of classData) {
      let body = {};
      if (elements.videoForAiring) {
        const { thumbLink, files } = await getThumbUrl(elements.videoForAiring);
        let videoForAiringThumbNailUrl = thumbLink,
          videoForAiringFiles = files;
        if (videoForAiringThumbNailUrl && elements.isTransCoding == false) {
          body["isTransCoding"] = true;
          body["videoForAiringThumbUrl"] = videoForAiringThumbNailUrl;
          body["videoForAiringFile"] = videoForAiringFiles;
        }
      }
      if (elements.videoForSneakPeek) {
        const { thumbLink, files } = await getThumbUrl(
          elements.videoForSneakPeek
        );
        let videoForSneakPeekThumbNailUrl = thumbLink,
          videoForSneakPeekFiles = files;
        if (
          videoForSneakPeekThumbNailUrl &&
          elements.isTransCodingSneakPeek == false
        ) {
          body["isTransCodingSneakPeek"] = true;
          body["videoForSneakPeekThumbUrl"] = videoForSneakPeekThumbNailUrl;
          body["videoForSneakPeekFile"] = videoForSneakPeekFiles;
        }
      }
      if (
        elements.isTransCoding == false ||
        elements.isTransCodingSneakPeek == false
      ) {
        const newClass = await classesService.findOneAndUpdate(
          {
            _id: elements._id,
          },
          body
        );
      }
    }
  }
};

const getThumbUrl = async (videoId) => {
  try {
    const url = `https://api.vimeo.com/videos/${videoId}?fields=uri,upload.status,transcode.status,name,pictures.sizes,files`;

    const params = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",

        Authorization: `Bearer ${access_token}`,
      },
    };

    let apiCall = await nodeFetch(url, params);
    if (apiCall && apiCall.transcode.status == "complete") {
      if (apiCall.pictures.sizes && apiCall.pictures.sizes.length > 0) {
        return {
          thumbLink:
            apiCall.pictures.sizes[apiCall.pictures.sizes.length - 1].link,
          files: apiCall.files,
        };
      }
    }
  } catch (error) {}

  return "";
};

import { S3 } from "aws-sdk";
import { readFileSync } from "fs";

const s3upload = async (filename) => {
  try {
    const ID = process.env.AWS_CLIENT_ID;
    const SECRET = process.env.AWS_CLIENT_SECRET;
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const s3 = new S3({
      accessKeyId: ID,
      secretAccessKey: SECRET,
    });

    const fileContent = readFileSync(filename);

    // S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: fileContent,
      ACL: "public-read",
    };

    var option = { partSize: 10 * 1024 * 1024, queueSize: 1 };
    const data = await s3.upload(params, option).promise();
    return data.Location;
  } catch (error) {
    console.log(error.message);
  }
};

export default s3upload;

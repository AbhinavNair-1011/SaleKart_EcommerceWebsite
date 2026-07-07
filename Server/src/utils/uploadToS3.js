const { PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const s3Client = require("../config/s3");

async function uploadToS3(file) {
  const key = crypto.randomUUID() + "-" + file.originalname;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

 const s3Res= await s3Client.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

module.exports = uploadToS3;

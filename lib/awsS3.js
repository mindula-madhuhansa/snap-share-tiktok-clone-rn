import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_KEY,
  },
});

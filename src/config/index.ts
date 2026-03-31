import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || "5000",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,

  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN!,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,

  RESEND_API_KEY: process.env.RESEND_API_KEY,

  
  REDIS_URL: process.env.REDIS_URL,
};
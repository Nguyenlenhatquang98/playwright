import dotenv from "dotenv";
dotenv.config();

export const TestConfig = {
  baseURL: process.env.BASE_URL,
  app_username: process.env.APP_USERNAME,
  app_password: process.env.APP_PASSWORD,
};

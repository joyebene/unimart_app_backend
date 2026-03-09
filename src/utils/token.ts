import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = (userId: string, email: string) =>
  jwt.sign({ id: userId, email }, config.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });

export const generateRefreshToken = (userId: string, email: string) =>
  jwt.sign({ id: userId, email }, config.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  
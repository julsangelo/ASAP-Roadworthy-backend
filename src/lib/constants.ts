import dotenv from "dotenv";

dotenv.config();

export const COOKIE_NAME = process.env.COOKIE_NAME as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const SERVICE_M8_API_KEY = process.env.SERVICE_M8_API_KEY as string;
export const APP_PORT = Number(process.env.APP_PORT);
export const FRONT_END_URL = process.env.FRONT_END_URL as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";
export const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE as
  | "lax"
  | "strict"
  | "none";

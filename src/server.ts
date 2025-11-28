import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import bookingsRouter from "./routes/bookings";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth";
import { APP_PORT, FRONT_END_URL } from "./lib/constants";
import messageRouter from "./routes/messages";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/bookings", authMiddleware, bookingsRouter);
app.use("/api/messages", authMiddleware, messageRouter);

app.listen(APP_PORT);

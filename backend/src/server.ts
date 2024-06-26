import express, { NextFunction, Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./router/auth.router";
import projectRouter from "./router/project.router";
import usersRouter from "./router/users.router";
import { verifyToken } from "./middleware/verifyToken";
import { verifyAdmin } from "./middleware/verifyAdmin";
import userRouter from "./router/user.router";

dotenv.config();
const app = express();
const localhost = "http://127.0.0.1:";
const allowedOrigins = [`${localhost}5500`, `${localhost}5501`];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
});
const noResource = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "No resource found", data: null });
};

app.use("/auth", authRouter);
app.use("/projects", verifyToken, verifyAdmin, projectRouter);
app.use("/users", verifyToken, verifyAdmin, usersRouter);
app.use("/user", verifyToken, userRouter);

app.use(noResource);

const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

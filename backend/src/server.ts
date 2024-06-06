import express, { NextFunction, Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/auth.router";
import projectRouter from "./router/project.router";
import userRouter from "./router/user.router";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
});

app.use("/auth", authRouter);
app.use("/projects", projectRouter);
app.use("/users", userRouter);

const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import { Router } from "express";
import {
  getAssigned,
  getUnassigned,
  getUser,
  getUserByEmail,
  getUsers,
} from "../controller/users.controller";

const userRouter = Router();

userRouter.get("/all", getUsers);
userRouter.post("/user_email", getUserByEmail);
userRouter.get("/assigned", getAssigned);
userRouter.get("/unassigned", getUnassigned);
userRouter.get("/:id", getUser);

export default userRouter;

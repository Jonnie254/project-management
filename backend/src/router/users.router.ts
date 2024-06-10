import { Router } from "express";
import {
  getAssigned,
  getUnassigned,
  getUser,
  getUserByEmail,
  getUsers,
} from "../controller/users.controller";

const usersRouter = Router();

usersRouter.get("/all", getUsers);
usersRouter.post("/user_email", getUserByEmail);
usersRouter.get("/assigned", getAssigned);
usersRouter.get("/unassigned", getUnassigned);
usersRouter.get("/:id", getUser);

export default usersRouter;

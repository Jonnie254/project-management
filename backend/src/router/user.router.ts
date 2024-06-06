import { Router } from "express";
import { fetchAllUsers } from "../controller/users.controller";

const userRouter = Router();

userRouter.get("/all", fetchAllUsers);

export default userRouter;

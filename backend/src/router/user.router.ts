import { Router } from "express";
import { getMyDetails, getMyProject } from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/details", getMyDetails);
userRouter.get("/project", getMyProject);

export default userRouter;

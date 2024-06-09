import { Router } from "express";
import { getMyProject } from "../controller/project.controller";

const myProjectRouter = Router();

myProjectRouter.get("/", getMyProject);

export default myProjectRouter;

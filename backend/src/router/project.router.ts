import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controller/project.controller";

const projectRouter = Router();

projectRouter.post("/create", createProject);
projectRouter.put("/update/:id", updateProject);
projectRouter.delete("/delete/:id", deleteProject);
projectRouter.get("/all", getProjects);
projectRouter.get("/:id", getProject);

export default projectRouter;

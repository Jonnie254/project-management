import { Router } from "express";
import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjects,
  updateProject,
} from "../controller/project.controller";

const projectRouter = Router();

projectRouter.post("/create", createProject);
projectRouter.put("/update:project_id", updateProject);
projectRouter.delete("/delete", deleteProject);
projectRouter.get("/all", fetchProjects);
projectRouter.get("/:project_id", fetchProject);

export default projectRouter;

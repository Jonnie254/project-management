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
projectRouter.put("/update", updateProject);
projectRouter.delete("/delete", deleteProject);
projectRouter.get("/:project_id", fetchProject);
projectRouter.get("/all", fetchProjects);

export default projectRouter;

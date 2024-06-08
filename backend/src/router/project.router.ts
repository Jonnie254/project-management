import { Router } from "express";
import {
  createProject,
  Deleteproject,
  fetchProject,
  fetchProjects,
  updateProject,
} from "../controller/project.controller";

const projectRouter = Router();

projectRouter.post("/create", createProject);
projectRouter.put("/:project_id", updateProject);
projectRouter.delete("/:project_id", Deleteproject);
projectRouter.get("/all", fetchProjects);
projectRouter.get("/:project_id", fetchProject);

export default projectRouter;

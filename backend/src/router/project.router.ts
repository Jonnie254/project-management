import { Router } from "express";
import {
  createProject,
<<<<<<< HEAD
  Deleteproject,
  fetchProject,
  fetchProjects,
=======
  deleteProject,
  getProject,
  getProjects,
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
  updateProject,
} from "../controller/project.controller";

const projectRouter = Router();

projectRouter.post("/create", createProject);
<<<<<<< HEAD
projectRouter.put("/:project_id", updateProject);
projectRouter.delete("/:project_id", Deleteproject);
projectRouter.get("/all", fetchProjects);
projectRouter.get("/:project_id", fetchProject);
=======
projectRouter.put("/update/:id", updateProject);
projectRouter.delete("/delete/:id", deleteProject);
projectRouter.get("/all", getProjects);
projectRouter.get("/:id", getProject);
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8

export default projectRouter;

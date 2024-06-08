import { Request, Response } from "express";
import { v4 } from "uuid";
import { Projects } from "../interfaces/projects";
import { projectServices } from "../services/projects.services";

export const createProject = async (req: Request, res: Response) => {
  const projectManager = new projectServices();
  const now = new Date();
  const project: Projects = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
    end_date: req.body.end_date,
    users_id:req.body.users_id,
    created_at: now,
    updated_at: now,
  };

  const newProject = await projectManager.createProject(project);
  if (newProject.success) {
    return res.status(200).json({ success: true, message: newProject.message });
  } else {
    return res
      .status(400)
      .json({ success: false, message: newProject.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const projectManager = new projectServices();
  const project_id = req.params.project_id;
  const project: Projects = req.body;
  const updatedProject = await projectManager.updateProject(
    project_id,
    project
  );
  if (updatedProject.success) {
    return res
      .status(200)
      .json({ success: true, message: updatedProject.message });
  } else {
    return res
      .status(400)
      .json({ success: false, message: updatedProject.message });
  }
};

export const Deleteproject = async (req: Request, res: Response) => {
  const projectManager = new projectServices();
  const project_id = req.params.project_id;
  const deletedProject = await projectManager.deleteProjects(project_id);
  if (deletedProject.success) {
    return res
      .status(200)
      .json({ success: true, message: deletedProject.message });
  } else {
    return res
      .status(400)
      .json({ success: false, message: deletedProject.message });
  }
};

export const fetchProject = async (req: Request, res: Response) => {
  const projectManager = new projectServices();
  const project_id = req.params.project_id;
  const project = await projectManager.fetchProject(project_id);
  if (project.success) {
    return res.status(200).json({ success: true, data: project.data });
  } else {
    return res.status(400).json({ success: false, message: project.message });
  }
};

export const fetchProjects = async (req: Request, res: Response) => {
  const projectManager = new projectServices();
  const projects = await projectManager.fetchProjects();
  if (projects.success) {
    return res
      .status(200)
      .json({ success: true, message: projects.message, data: projects.data });
  } else {
    return res.status(400).json({ success: false, message: projects.message });
  }
};

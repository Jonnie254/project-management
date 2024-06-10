import { Request, Response } from "express";
import { v4 } from "uuid";
import { Project } from "../interfaces/project";
import { projectServices } from "../services/projects.services";
import { getIDFromToken } from "../middleware/getIDFromToken";

export const createProject = async (req: Request, res: Response) => {
  const now = new Date().toISOString();
  const project: Project = req.body;
  project.id = v4();
  project.created_at = now;
  project.updated_at = now;

  const projects = new projectServices();
  const response = await projects.createProject(project);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(201).json(response);
};

export const updateProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const project: Project = req.body;
  project.id = id;
  project.updated_at = new Date().toISOString();
  const projects = new projectServices();
  const response = await projects.updateProject(id, project);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const projects = new projectServices();
  const response = await projects.deleteProject(id);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

export const getProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const projects = new projectServices();
  const response = await projects.getProject(id);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = new projectServices();
  const response = await projects.getProjects();
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

import { Request, Response } from "express";
import { UserServices } from "../services/users.services";

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const auth = new UserServices();
  const response = await auth.getUser(id);
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const auth = new UserServices();
  const response = await auth.getUserByEmail(email);
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

export const getUsers = async (req: Request, res: Response) => {
  const auth = new UserServices();
  const response = await auth.getUsers();
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

export const getAssigned = async (req: Request, res: Response) => {
  const auth = new UserServices();
  const response = await auth.getAssigned();
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

export const getUnassigned = async (req: Request, res: Response) => {
  const auth = new UserServices();
  const response = await auth.getUnassigned();
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

import { Request, Response } from "express";
import { User } from "../interfaces/user";
import { Authorization } from "../services/authorization";
import { v4 } from "uuid";
import { user_login } from "../interfaces/user_login";
import { user_details } from "../interfaces/user_details";
// import { sendEmail } from "../background-services/mailer";

export const register = async (req: Request, res: Response) => {
  let user: User = req.body;
  user.id = v4();
  const auth = new Authorization();
  const response = await auth.register(user);
  if (!response.success) {
    return res.status(400).json(response);
  }
  // sendEmail(user.email);
  res.cookie("token", response.data.token, {
    httpOnly: true,
  });
  return res.status(200).json(response);
};

export const login = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const login_details: user_login = req.body;
  const response = await auth.login(login_details);
  if (!response.success) {
    return res.status(401).json(response);
  }
  res.cookie("token", response.data.token, {
    httpOnly: true,
  });
  return res.status(200).json(response);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out", data: null });
};

export const updateDetails = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const user: user_details = req.body;
  const response = await auth.updateDetails(user);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(400).json(response);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const { id, oldPassword, password } = req.body;
  const response = await auth.updatePassword(id, oldPassword, password);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(400).json(response);
  }
};

export const updateForgotPassword = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const { id, password } = req.body;
  const response = await auth.updateForgotPassword(id, password);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(400).json(response);
  }
};

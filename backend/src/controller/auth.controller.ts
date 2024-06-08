import { Request, Response } from "express";
import { User } from "../interfaces/user";
import { Authorization } from "../services/authorization";
import { v4 } from "uuid";
import { user_login } from "../interfaces/user_login";

export const register = async (req: Request, res: Response) => {
  let user: User = req.body;
  user.id = v4();
  const auth = new Authorization();
  const register = await auth.register(user);
  if (register.success) {
    return res
      .status(200)
      .json({ success: true, message: register.message, data: register.data });
  } else {
    return res
      .status(400)
      .json({ success: false, message: register.message, data: register.data });
  }
};

export const login = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const login_details: user_login = req.body;
  const login = await auth.login(login_details);
  if (!login.success) {
    return res
      .status(401)
      .json({ success: false, message: login.message, data: login.data });
  } else {
    return res
      .status(200)
      .json({ success: true, message: login.message, data: login.data });
  }
};

export const logout = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Logged out", data: null });
};

export const updateDetails = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const user: User = req.body;
  const update = await auth.updateDetails(user);
  if (update.success) {
    return res
      .status(200)
      .json({ success: true, message: update.message, data: update.data });
  } else {
    return res
      .status(400)
      .json({ success: false, message: update.message, data: update.data });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const { id, password, oldPassword } = req.body;
  const update = await auth.updatePassword(id, password, oldPassword);
  if (update.success) {
    return res
      .status(200)
      .json({ success: true, message: update.message, data: update.data });
  } else {
    return res
      .status(400)
      .json({ success: false, message: update.message, data: update.data });
  }
};

export const updateForgotPassword = async (req: Request, res: Response) => {
  const auth = new Authorization();
  const { id, password } = req.body;
  const update = await auth.updateForgotPassword(id, password);
  if (update.success) {
    return res
      .status(200)
      .json({ success: true, message: update.message, data: update.data });
  } else {
    return res
      .status(400)
      .json({ success: false, message: update.message, data: update.data });
  }
};

import { Request, Response } from "express";
import { User, user_login } from "../interfaces/users";
import { Authorization } from "../services/authorization";
import { v4 } from "uuid";

export const register = async (req: Request, res: Response) => {
  let user: User = req.body;
  user.id = v4();
  const auth = new Authorization();
  const register = await auth.RegisterUser(user);
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

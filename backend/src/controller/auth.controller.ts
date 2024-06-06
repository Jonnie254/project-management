import { Request, Response } from "express";
import { User } from "../interfaces/users";
import { authorization } from "../services/authorization";
import { UserService } from "../services/users.services";

export const register = async (req: Request, res: Response) => {
  let user: User = req.body;
  const auth = new UserService();
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
  const auth = new authorization();
  const { email, password } = req.body;
  const login = await auth.Login({ email, password });
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

import { Request, Response } from "express";
import { UserService } from "../services/users.services";

export const fetchAllUsers = async (req: Request, res: Response) => {
  const auth = new UserService();
  const users = await auth.FetchAllUsers();
  if (!users.success) {
    return res
      .status(400)
      .json({ success: false, message: users.message, data: users.data });
  } else {
    return res
      .status(200)
      .json({ success: true, message: users.message, data: users.data });
  }
};

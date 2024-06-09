import { Request, Response } from "express";
import { getIDFromToken } from "../middleware/getIDFromToken";
import { UserServices } from "../services/user.service";

export const getMyProject = async (req: Request, res: Response) => {
  const user_id = getIDFromToken(req);
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
  const userService = new UserServices();
  const response = await userService.getMyProject(user_id);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

export const getMyDetails = async (req: Request, res: Response) => {
  const id = getIDFromToken(req);
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
  const userService = new UserServices();
  const response = await userService.getMyDetails(id);
  if (!response.success) {
    return res.status(400).json(response);
  }
  return res.status(200).json(response);
};

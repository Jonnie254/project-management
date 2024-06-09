import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserServices } from "../services/users.services";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const result = jwt.verify(token, process.env.JWT_SECRET as string);
    const id: string = (result as any).id;

    const userService = new UserServices();
    const userResponse = await userService.getUser(id);
    if (!userResponse.success) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Failed to fetch user data.",
        data: null,
      });
    }
    if (userResponse.data.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Access denied", data: null });
    }
    next();
  } catch (error) {
    res.clearCookie("token");
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", data: null });
  }
};

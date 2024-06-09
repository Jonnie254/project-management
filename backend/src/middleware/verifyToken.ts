import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied", data: null });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", data: null });
  }
};

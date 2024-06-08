import { Request } from "express";
import jwt from "jsonwebtoken";

export const getIDFromToken = (req: Request) => {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string);
    return id;
  } catch (error) {
    return null;
  }
};

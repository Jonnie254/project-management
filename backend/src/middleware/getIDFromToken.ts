import { Request } from "express";
import jwt from "jsonwebtoken";

export const getIDFromToken = (req: Request) => {
  try {
    const token = req.cookies.token || req.headers["authorization"];
    const result = jwt.verify(token, process.env.JWT_SECRET as string);
    const id: string = (result as any).id;
    return id;
  } catch (error) {
    return null;
  }
};

import { Router } from "express";
import {
  login,
  logout,
  register,
  updateDetails,
  updateForgotPassword,
  updatePassword,
} from "../controller/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.put("/update", verifyToken, updateDetails);
authRouter.put("/update-password", verifyToken, updatePassword);
authRouter.put("/forgot-password", updateForgotPassword);

export default authRouter;

import { Router } from "express";
import {
  login,
  logout,
  register,
  updateDetails,
  updateForgotPassword,
  updatePassword,
} from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update", updateDetails);
authRouter.put("/update-password", updatePassword);
authRouter.put("/forgot-password", updateForgotPassword);

export default authRouter;

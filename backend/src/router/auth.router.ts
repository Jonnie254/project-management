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
<<<<<<< HEAD

authRouter.post("/login", login);
=======
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.put("/update", verifyToken, updateDetails);
authRouter.put("/update-password", verifyToken, updatePassword);
authRouter.put("/forgot-password", updateForgotPassword);
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8

export default authRouter;

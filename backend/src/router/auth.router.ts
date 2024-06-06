import { Router } from "express";
import { login, register } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.get("/login", login);

export default authRouter;

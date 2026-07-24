import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
userRouter.post("/login", authController.login);
userRouter.post("/signup", authController.signup);

export default userRouter;

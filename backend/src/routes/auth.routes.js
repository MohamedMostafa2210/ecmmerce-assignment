import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validation } from "../middlewares/validation.middleware.js";
import * as validator from "../utils/auth.validation.js";
const userRouter = express.Router();
userRouter.post("/login", validation(validator.login), authController.login);
userRouter.post("/signup", validation(validator.signup), authController.signup);

export default userRouter;

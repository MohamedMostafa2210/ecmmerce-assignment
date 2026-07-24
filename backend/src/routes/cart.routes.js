import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const cart_Router = express.Router();

cart_Router.get("/cart", auth(), cartController.getCart);
cart_Router.post("/add-to-cart", auth(), cartController.addToCart);
cart_Router.patch("/cart", auth(), cartController.updateCart);
cart_Router.delete("/cart/:productId", auth(), cartController.removeFromCart);

export default cart_Router;

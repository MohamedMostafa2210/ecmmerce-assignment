import express from "express";
import * as ordersController from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const orders_router = express.Router();

// Orders
orders_router.post("/add-order", auth(), ordersController.createOrder);
orders_router.get("/orders", auth(), ordersController.getOrders);
orders_router.get("/orders/:id", auth(), ordersController.getOrderById);
orders_router.patch("/orders/cancel/:id", auth(), ordersController.cancelOrder);
orders_router.patch(
  "/orders/status/:id",
  auth([roleEnum.admin]),
  ordersController.updateOrderStatus,
);

export default orders_router;

import express from "express";
import * as DashboardController from "../controllers/Dashboard.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const Dashboard_router = express.Router();

// Dashboard
Dashboard_router.get(
  "/dashboard",
  auth([roleEnum.admin]),
  DashboardController.getDashboard,
);
Dashboard_router.get(
  "/dashboard/users",
  auth([roleEnum.admin]),
  DashboardController.getDashboardUsers,
);
Dashboard_router.get(
  "/dashboard/orders",
  auth([roleEnum.admin]),
  DashboardController.getDashboardOrders,
);
Dashboard_router.get(
  "/dashboard/products",
  auth([roleEnum.admin]),
  DashboardController.getDashboardProducts,
);
Dashboard_router.get(
  "/dashboard/reports",
  auth([roleEnum.admin]),
  DashboardController.getDashboardReports,
);
export default Dashboard_router;

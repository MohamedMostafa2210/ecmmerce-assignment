import express from "express";
import * as CategoryController from "../controllers/Category.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const Category_router = express.Router();
// Category
Category_router.get("/categories", CategoryController.getCategories);
Category_router.get("/categories/:id", CategoryController.getCategoryById);
Category_router.post(
  "/create-category",
  auth([roleEnum.admin]),
  CategoryController.createCategory,
);
Category_router.patch(
  "/categories/:id",
  auth([roleEnum.admin]),
  CategoryController.updateCategory,
);
Category_router.delete(
  "/categories/:id",
  auth([roleEnum.admin]),
  CategoryController.deleteCategory,
);

export default Category_router;

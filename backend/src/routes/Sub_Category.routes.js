import express from "express";
import * as SubCategoryController from "../controllers/SubCategory.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const SubCategory_router = express.Router();
// SubCategory
SubCategory_router.get("/Sub-Category", SubCategoryController.getSubCategories);
SubCategory_router.post(
  "/create-Sub-Category",
  auth([roleEnum.admin]),
  SubCategoryController.createSubCategory,
);
SubCategory_router.patch(
  "/Sub-Category/:id",
  auth([roleEnum.admin]),
  SubCategoryController.updateSubCategory,
);
SubCategory_router.delete(
  "/Sub-Category/:id",
  auth([roleEnum.admin]),
  SubCategoryController.deleteSubCategory,
);

export default SubCategory_router;

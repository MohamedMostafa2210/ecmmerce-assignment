import express from "express";
import * as BrandController from "../controllers/Brand.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const Brand_router = express.Router();
// Brand_router
Brand_router.get("/brands", BrandController.getBrands);
Brand_router.post(
  "/create-brand",
  auth([roleEnum.admin]),
  BrandController.createBrand,
);
Brand_router.patch(
  "/brands/:id",
  auth([roleEnum.admin]),
  BrandController.updateBrand,
);
Brand_router.delete(
  "/brands/:id",
  auth([roleEnum.admin]),
  BrandController.deleteBrand,
);
export default Brand_router;

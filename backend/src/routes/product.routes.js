import express from "express";
import * as ProductController from "../controllers/Product.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";
import { upload } from "../middlewares/uplodes.middleware.js";

const Product_router = express.Router();

// Product
Product_router.get("/products", ProductController.getProducts);
Product_router.get("/products/:id", ProductController.getProductById);
Product_router.post(
  "/create-product",
  auth([roleEnum.admin]),
  upload.array("images"),
  ProductController.createProduct,
);
Product_router.patch(
  "/products/:id",
  auth([roleEnum.admin]),
  ProductController.updateProduct,
);
Product_router.delete(
  "/products/:id",
  auth([roleEnum.admin]),
  ProductController.deleteProduct,
);
Product_router.get(
  "/products/category/:categoryId",
  ProductController.getProductsByCategory,
);
Product_router.get("/products/search", ProductController.searchProducts);
Product_router.get("/products/filter", ProductController.filterProducts);
export default Product_router;

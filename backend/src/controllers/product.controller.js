import { categoryModel } from "../DB/models/Category.Model.js";
import { subCategoryModel } from "../DB/models/Sub.Category.js";
import { brandModel } from "../DB/models/Brand.Model.js";
import { productModel } from "../DB/models/Product.Model.js";
import { cartModel } from "../DB/models/Cart.Model.js";
import { wishlistModel } from "../DB/models/Wishlist.Model.js";
import { orderModel, orderStatusEnum } from "../DB/models/Order.Model.js";
import { orderItemModel } from "../DB/models/OrderItems.Model.js";
import { reviewModel } from "../DB/models/Review.Model.js";
import { userModel } from "../DB/models/User.Model.js";
import {
  asyncHandler,
  errResponse,
  successResponse,
} from "../utils/responses.js";
import * as DBservice from "../DB/db.service.js";
import { defaultPopulate, buildSearchFilter } from "./ecommerce.controller.js";

// Product
export const getProducts = asyncHandler(async (req, res) => {
  const filter = buildSearchFilter(req.query, { isDeleted: false });
  const products = await DBservice.find({
    model: productModel,
    filter,
    sort: { createdAt: -1 },
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: products,
    message: "Products fetched successfully",
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await DBservice.findOne({
    model: productModel,
    filter: { _id: req.params.id, isDeleted: false },
    populate: defaultPopulate.product,
  });
  if (!product)
    return errResponse({ res, statusCode: 404, massage: "Product not found" });

  return successResponse({
    res,
    statusCode: 200,
    data: product,
    message: "Product fetched successfully",
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const data = {
    ...req.body,
    images: req.files?.map((file) => `uploads/${file.filename}`) || [],
    finalPrice:
      req.body.price - (req.body.price * (req.body.discount || 0)) / 100,
  };
  if (req.file) {
    data.picture = req.file.path;
  }

  const product = await DBservice.createOne({
    model: productModel,
    data: data,
  });
  return successResponse({
    res,
    statusCode: 201,
    data: product,
    message: "Product created successfully",
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (payload.price !== undefined && payload.discount !== undefined) {
    payload.finalPrice =
      payload.price - (payload.price * payload.discount) / 100;
  }

  const result = await DBservice.updateOne({
    model: productModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: payload,
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Product not found" });

  const product = await DBservice.findOne({
    model: productModel,
    filter: { _id: req.params.id },
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: product,
    message: "Product updated successfully",
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: productModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Product not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Product deleted successfully",
  });
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await DBservice.find({
    model: productModel,
    filter: { categoryId: req.params.categoryId, isDeleted: false },
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: products,
    message: "Products fetched successfully",
  });
});

export const searchProducts = asyncHandler(async (req, res) => {
  const filter = buildSearchFilter(req.query, { isDeleted: false });
  const products = await DBservice.find({
    model: productModel,
    filter,
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: products,
    message: "Search results",
  });
});

export const filterProducts = asyncHandler(async (req, res) => {
  const filter = buildSearchFilter(req.query, { isDeleted: false });
  const products = await DBservice.find({
    model: productModel,
    filter,
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: products,
    message: "Filtered products",
  });
});

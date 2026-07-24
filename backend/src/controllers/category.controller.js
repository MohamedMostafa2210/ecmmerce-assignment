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

// Category
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await DBservice.find({
    model: categoryModel,
    filter: { isDeleted: false },
    sort: { createdAt: -1 },
  });

  return successResponse({
    res,
    statusCode: 200,
    data: categories,
    message: "Categories fetched successfully",
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await DBservice.findOne({
    model: categoryModel,
    filter: { _id: req.params.id, isDeleted: false },
  });
  if (!category)
    return errResponse({ res, statusCode: 404, massage: "Category not found" });

  return successResponse({
    res,
    statusCode: 200,
    data: category,
    message: "Category fetched successfully",
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await DBservice.createOne({
    model: categoryModel,
    data: req.body,
  });
  return successResponse({
    res,
    statusCode: 201,
    data: category,
    message: "Category created successfully",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: categoryModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: req.body,
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Category not found" });

  const category = await DBservice.findOne({
    model: categoryModel,
    filter: { _id: req.params.id },
  });
  return successResponse({
    res,
    statusCode: 200,
    data: category,
    message: "Category updated successfully",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: categoryModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Category not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Category deleted successfully",
  });
});


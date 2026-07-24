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

// SubCategory
export const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await DBservice.find({
    model: subCategoryModel,
    filter: { isDeleted: false },
    sort: { createdAt: -1 },
    populate: ["categoryId"],
  });
  return successResponse({
    res,
    statusCode: 200,
    data: subCategories,
    message: "Subcategories fetched successfully",
  });
});

export const createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await DBservice.createOne({
    model: subCategoryModel,
    data: req.body,
  });
  return successResponse({
    res,
    statusCode: 201,
    data: subCategory,
    message: "Subcategory created successfully",
  });
});

export const updateSubCategory = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: subCategoryModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: req.body,
  });
  if (!result.matchedCount)
    return errResponse({
      res,
      statusCode: 404,
      massage: "Subcategory not found",
    });

  const subCategory = await DBservice.findOne({
    model: subCategoryModel,
    filter: { _id: req.params.id },
    populate: ["categoryId"],
  });
  return successResponse({
    res,
    statusCode: 200,
    data: subCategory,
    message: "Subcategory updated successfully",
  });
});

export const deleteSubCategory = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: subCategoryModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  if (!result.matchedCount)
    return errResponse({
      res,
      statusCode: 404,
      massage: "Subcategory not found",
    });

  return successResponse({
    res,
    statusCode: 200,
    message: "Subcategory deleted successfully",
  });
});

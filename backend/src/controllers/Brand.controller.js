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

// Brand
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await DBservice.find({
    model: brandModel,
    filter: { isDeleted: false },
    sort: { createdAt: -1 },
  });
  return successResponse({
    res,
    statusCode: 200,
    data: brands,
    message: "Brands fetched successfully",
  });
});

export const createBrand = asyncHandler(async (req, res) => {
  const brand = await DBservice.createOne({
    model: brandModel,
    data: req.body,
  });
  return successResponse({
    res,
    statusCode: 201,
    data: brand,
    message: "Brand created successfully",
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: brandModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: req.body,
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Brand not found" });

  const brand = await DBservice.findOne({
    model: brandModel,
    filter: { _id: req.params.id },
  });
  return successResponse({
    res,
    statusCode: 200,
    data: brand,
    message: "Brand updated successfully",
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: brandModel,
    filter: { _id: req.params.id, isDeleted: false },
    data: { isDeleted: true, deletedAt: new Date() },
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Brand not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Brand deleted successfully",
  });
});

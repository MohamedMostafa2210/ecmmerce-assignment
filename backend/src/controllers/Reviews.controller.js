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
import { defaultPopulate } from "./ecommerce.controller.js";

// Reviews
export const createReview = asyncHandler(async (req, res) => {
  const review = await DBservice.createOne({
    model: reviewModel,
    data: { ...req.body, userId: req.user._id },
  });
  return successResponse({
    res,
    statusCode: 201,
    data: review,
    message: "Review created successfully",
  });
});

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await DBservice.find({
    model: reviewModel,
    filter: { productId: req.params.productId },
    populate: defaultPopulate.review,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: reviews,
    message: "Reviews fetched successfully",
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: reviewModel,
    filter: { _id: req.params.id, userId: req.user._id },
    data: req.body,
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Review not found" });

  const review = await DBservice.findOne({
    model: reviewModel,
    filter: { _id: req.params.id },
    populate: defaultPopulate.review,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: review,
    message: "Review updated successfully",
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const result = await DBservice.deleteOne({
    model: reviewModel,
    filter: { _id: req.params.id, userId: req.user._id },
  });
  if (!result.deletedCount)
    return errResponse({ res, statusCode: 404, massage: "Review not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Review deleted successfully",
  });
});

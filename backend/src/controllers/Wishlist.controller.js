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

// Wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await DBservice.findOne({
    model: wishlistModel,
    filter: { userId: req.user._id },
    populate: ["products"],
  });
  return successResponse({
    res,
    statusCode: 200,
    data: wishlist || { userId: req.user._id, products: [] },
    message: "Wishlist fetched successfully",
  });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  let wishlist = await DBservice.findOne({
    model: wishlistModel,
    filter: { userId: req.user._id },
  });

  if (!wishlist) {
    wishlist = await DBservice.createOne({
      model: wishlistModel,
      data: { userId: req.user._id, products: [productId] },
    });
  } else if (!wishlist.products.some((item) => item.toString() === productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
  }

  return successResponse({
    res,
    statusCode: 200,
    data: wishlist,
    message: "Product added to wishlist",
  });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await DBservice.findOne({
    model: wishlistModel,
    filter: { userId: req.user._id },
  });
  if (!wishlist)
    return errResponse({ res, statusCode: 404, massage: "Wishlist not found" });

  wishlist.products = wishlist.products.filter(
    (item) => item.toString() !== req.params.productId,
  );
  await wishlist.save();
  return successResponse({
    res,
    statusCode: 200,
    data: wishlist,
    message: "Product removed from wishlist",
  });
});

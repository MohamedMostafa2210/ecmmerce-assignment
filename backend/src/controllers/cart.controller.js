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

// Cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await DBservice.findOne({
    model: cartModel,
    filter: { userId: req.user._id },
    populate: ["products.productId"],
  });
  return successResponse({
    res,
    statusCode: 200,
    data: cart || { userId: req.user._id, products: [] },
    message: "Cart fetched successfully",
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await DBservice.findOne({
    model: cartModel,
    filter: { userId: req.user._id },
  });

  if (!cart) {
    cart = await DBservice.createOne({
      model: cartModel,
      data: { userId: req.user._id, products: [{ productId, quantity }] },
    });
  } else {
    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
  }

  return successResponse({
    res,
    statusCode: 200,
    data: cart,
    message: "Product added to cart",
  });
});

export const updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await DBservice.findOne({
    model: cartModel,
    filter: { userId: req.user._id },
  });
  if (!cart)
    return errResponse({ res, statusCode: 404, massage: "Cart not found" });

  const item = cart.products.find(
    (entry) => entry.productId.toString() === productId,
  );
  if (!item)
    return errResponse({
      res,
      statusCode: 404,
      massage: "Product not found in cart",
    });

  item.quantity = quantity;
  await cart.save();
  return successResponse({
    res,
    statusCode: 200,
    data: cart,
    message: "Cart updated successfully",
  });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await DBservice.findOne({
    model: cartModel,
    filter: { userId: req.user._id },
  });
  if (!cart)
    return errResponse({ res, statusCode: 404, massage: "Cart not found" });

  cart.products = cart.products.filter(
    (item) => item.productId.toString() !== req.params.productId,
  );
  await cart.save();
  return successResponse({
    res,
    statusCode: 200,
    data: cart,
    message: "Product removed from cart",
  });
});

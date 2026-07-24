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

// Orders
export const createOrder = asyncHandler(async (req, res) => {
  const { addressId, paymentMethod, coupon, items = [] } = req.body;
  if (!addressId || !items.length)
    return errResponse({
      res,
      statusCode: 400,
      massage: "Address and items are required",
    });

  const order = await DBservice.createOne({
    model: orderModel,
    data: {
      userId: req.user._id,
      addressId,
      paymentMethod,
      coupon,
      status: orderStatusEnum.pending,
      totalPrice: 0,
      finalPrice: 0,
    },
  });

  let totalPrice = 0;
  for (const item of items) {
    const product = await DBservice.findOne({
      model: productModel,
      filter: { _id: item.productId },
    });
    if (!product) continue;

    totalPrice += product.price * (item.quantity || 1);
    await DBservice.createOne({
      model: orderItemModel,
      data: {
        orderId: order._id,
        productId: product._id,
        quantity: item.quantity || 1,
        price: product.price,
      },
    });
  }

  order.totalPrice = totalPrice;
  order.finalPrice = totalPrice;
  await order.save();

  return successResponse({
    res,
    statusCode: 201,
    data: order,
    message: "Order created successfully",
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await DBservice.find({
    model: orderModel,
    filter: { userId: req.user._id },
    sort: { createdAt: -1 },
    populate: defaultPopulate.order,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: orders,
    message: "Orders fetched successfully",
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await DBservice.findOne({
    model: orderModel,
    filter: { _id: req.params.id, userId: req.user._id },
    populate: defaultPopulate.order,
  });
  if (!order)
    return errResponse({ res, statusCode: 404, massage: "Order not found" });

  const items = await DBservice.find({
    model: orderItemModel,
    filter: { orderId: order._id },
    populate: ["productId"],
  });
  return successResponse({
    res,
    statusCode: 200,
    data: { ...order.toObject(), items },
    message: "Order fetched successfully",
  });
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: orderModel,
    filter: { _id: req.params.id, userId: req.user._id },
    data: { status: orderStatusEnum.cancelled },
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Order not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Order cancelled successfully",
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const result = await DBservice.updateOne({
    model: orderModel,
    filter: { _id: req.params.id },
    data: { status },
  });
  if (!result.matchedCount)
    return errResponse({ res, statusCode: 404, massage: "Order not found" });

  return successResponse({
    res,
    statusCode: 200,
    message: "Order status updated successfully",
  });
});

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

// Dashboard
export const getDashboard = asyncHandler(async (req, res) => {
  const [users, orders, products, categories, brands] = await Promise.all([
    DBservice.find({ model: userModel, filter: { isDeleted: false } }),
    DBservice.find({ model: orderModel, filter: {} }),
    DBservice.find({ model: productModel, filter: { isDeleted: false } }),
    DBservice.find({ model: categoryModel, filter: { isDeleted: false } }),
    DBservice.find({ model: brandModel, filter: { isDeleted: false } }),
  ]);

  return successResponse({
    res,
    statusCode: 200,
    data: {
      users: users.length,
      orders: orders.length,
      products: products.length,
      categories: categories.length,
      brands: brands.length,
    },
    message: "Dashboard fetched successfully",
  });
});

export const getDashboardUsers = asyncHandler(async (req, res) => {
  const users = await DBservice.find({
    model: userModel,
    filter: { isDeleted: false },
  });
  return successResponse({
    res,
    statusCode: 200,
    data: users,
    message: "Users fetched successfully",
  });
});

export const getDashboardOrders = asyncHandler(async (req, res) => {
  const orders = await DBservice.find({
    model: orderModel,
    filter: {},
    populate: defaultPopulate.order,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: orders,
    message: "Orders fetched successfully",
  });
});

export const getDashboardProducts = asyncHandler(async (req, res) => {
  const products = await DBservice.find({
    model: productModel,
    filter: { isDeleted: false },
    populate: defaultPopulate.product,
  });
  return successResponse({
    res,
    statusCode: 200,
    data: products,
    message: "Products fetched successfully",
  });
});

export const getDashboardReports = asyncHandler(async (req, res) => {
  const orders = await DBservice.find({ model: orderModel, filter: {} });
  const products = await DBservice.find({
    model: productModel,
    filter: { isDeleted: false },
  });
  return successResponse({
    res,
    statusCode: 200,
    data: { orders: orders.length, products: products.length },
    message: "Reports fetched successfully",
  });
});

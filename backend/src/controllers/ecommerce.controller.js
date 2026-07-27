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
import { addressModel } from "../DB/models/Address.Model.js";
import {
  asyncHandler,
  errResponse,
  successResponse,
} from "../utils/responses.js";
import * as DBservice from "../DB/db.service.js";

export const defaultPopulate = {
  product: ["brandId", "categoryId", "subCategoryId"],
  review: ["userId", "productId"],
  order: ["userId", "addressId", "coupon"],
};

export const buildSearchFilter = (query = {}, baseFilter = {}) => {
  const filter = { ...baseFilter };

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.title) {
    filter.title = { $regex: query.title, $options: "i" };
  }

  if (query.categoryId) {
    filter.categoryId = query.categoryId;
  }

  if (query.subCategoryId) {
    filter.subCategoryId = query.subCategoryId;
  }

  if (query.brandId) {
    filter.brandId = query.brandId;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return filter;
};

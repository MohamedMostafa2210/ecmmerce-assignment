import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalPrice: Number,

    stock: {
      type: Number,
      default: 0,
    },

    soldItems: {
      type: Number,
      default: 0,
    },

    colors: [String],

    sizes: [String],

    images: [String],

    brandId: {
      type: Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategoryId: {
      type: Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
    restoredAt: Date,
  },
  {
    timestamps: true,
  },
);

export const productModel = model("Product", productSchema);

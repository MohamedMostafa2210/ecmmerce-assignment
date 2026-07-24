import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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

export const subCategoryModel = mongoose.model(
  "SubCategory",
  subCategorySchema,
);

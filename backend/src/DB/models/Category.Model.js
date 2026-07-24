import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
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

export const categoryModel = mongoose.model("Category", categorySchema);

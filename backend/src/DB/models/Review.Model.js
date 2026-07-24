import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: String,
  },
  {
    timestamps: true,
  },
);

export const reviewModel = model("Review", reviewSchema);

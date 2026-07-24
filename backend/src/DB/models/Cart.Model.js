import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const cartModel = model("Cart", cartSchema);

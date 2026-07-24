import { Schema, model, Types } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
    },

    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const orderItemModel = model("OrderItem", orderItemSchema);

import { Schema, model, Types } from "mongoose";
export const paymentMethodEnum = {
  cash: "Cash",
  card: "Card",
};
export const orderStatusEnum = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    addressId: {
      type: Types.ObjectId,
      ref: "Address",
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(paymentMethodEnum),
      default: paymentMethodEnum.cash,
    },

    status: {
      type: String,
      enum: Object.values(orderStatusEnum),
      default: orderStatusEnum.pending,
    },

    totalPrice: Number,

    shippingFees: Number,

    coupon: {
      type: Types.ObjectId,
      ref: "Coupon",
    },

    finalPrice: Number,
  },
  {
    timestamps: true,
  },
);

export const orderModel = model("Order", orderSchema);

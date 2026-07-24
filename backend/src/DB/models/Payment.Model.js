import { Schema, model, Types } from "mongoose";

export const paymentStatusEnum = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
};

const paymentSchema = new Schema(
  {
    orderId: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
    },

    paymentMethod: String,

    paymentStatus: {
      type: String,
      enum: Object.values(paymentStatusEnum),
      default: paymentStatusEnum.pending,
    },

    transactionId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const paymentModel = model("Payment", paymentSchema);

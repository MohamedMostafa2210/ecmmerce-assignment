import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    street: {
      type: String,
      required: true,
    },

    building: {
      type: String,
      required: true,
    },

    floor: {
      type: String,
      default: "",
    },

    apartment: {
      type: String,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const addressModel = mongoose.model("Address", addressSchema);

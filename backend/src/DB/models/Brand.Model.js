import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    logo: {
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

export const brandModel = mongoose.model("Brand", brandSchema);

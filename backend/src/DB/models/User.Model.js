import { model, Schema } from "mongoose";

export const genderEnum = { male: "Male", female: "Female" };
export const roleEnum = { user: "user", admin: "admin" };

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: [2, "Minimum length is 2"],
      maxlength: [20, "Maximum length is 20"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [2, "Minimum length is 2"],
      maxlength: [20, "Maximum length is 20"],
    },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    gender: {
      type: String,
      enum: Object.values(genderEnum),
      default: genderEnum.male,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
      default: roleEnum.user,
    },

    phoneNumber: { type: String },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },

    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    restoredAt: { type: Date },
    restoredBy: { type: Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

// Define the virtual field
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

export const userModel = model("User", userSchema);

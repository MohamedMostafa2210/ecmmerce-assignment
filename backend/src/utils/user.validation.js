import joi from "joi";
import { generalFields } from "./validation.schema.js";

export const getUserProfile = joi.object({}).keys({
  userId: generalFields.userId,
});
export const passwordandOTP = joi.object({}).keys({
  otp: generalFields.otp,
  password: generalFields.password,
});
export const OTP = joi.object({}).keys({
  otp: generalFields.otp,
});
export const updatePassword = joi.object({}).keys({
  otp: generalFields.otp,
  newpassword: generalFields.newpassword,
  confirmnewpassword: generalFields.confirmnewpassword,
});
export const freezeAccount = joi.object({}).keys({
  userId: generalFields.userId,
});
export const restoreAccount = joi.object({}).keys({
  userId: generalFields.userId.required(),
});
export const deleteAccount = joi.object({}).keys({
  userId: generalFields.userId.required(),
});

export const shareProfile = joi.object({}).keys({
  userId: generalFields.userId.required(),
});

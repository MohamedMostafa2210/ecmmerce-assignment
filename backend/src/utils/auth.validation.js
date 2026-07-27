import { generalFields } from "./validation.schema.js";
import joi from "joi";
export const signup = joi.object({}).keys({
  firstname: generalFields.firstname.required(),
  lastname: generalFields.lastname.required(),
  email: generalFields.email.required(),
  password: generalFields.password.required(),
  gender: generalFields.gender,
  phoneNumber: generalFields.phoneNumber,
  confirmPassword: generalFields.confirmPassword,
  age: generalFields.age,
});

export const login = joi.object({}).keys({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
});

export const changePassword = joi.object({}).keys({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
  confirmPassword: generalFields.confirmPassword,
  otp: generalFields.otp,
});

export const confirmEmail = joi.object({}).keys({
  email: generalFields.email.required(),
  otp: generalFields.otp,
});
export const confirmOldEmailupdate = joi.object({}).keys({
  otp: generalFields.otp,
});

export const forgetPassword = joi.object({}).keys({
  email: generalFields.email.required(),
});

export const resendEmailOTP = joi.object({}).keys({
  email: generalFields.email.required(),
});
export const Email = joi.object({}).keys({
  email: generalFields.email.required(),
});

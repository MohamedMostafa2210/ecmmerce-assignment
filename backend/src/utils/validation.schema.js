import joi from "joi";
import { Types } from "mongoose";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/;
export const generalFields = {
  userId: joi.custom((value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.error("any.invalid", { message: "invalid id" });
  }),
  firstname: joi
    .string()
    .pattern(new RegExp(/^[A-Za-z]{2,30}$/))
    .required()
    .trim()
    .messages({
      "any.required": "you must enter your firstname",
    }),

  lastname: joi
    .string()
    .pattern(new RegExp(/^[A-Za-z][A-Za-z' -]{1,29}$/))
    .required()
    .trim()
    .messages({
      "any.required": "you must enter your name",
    }),

  email: joi
    .string()
    .trim()
    .pattern(
      new RegExp(/^[a-zA-Z0-9._%+-]+@(gmail|icloud|outlook)\.(com|net)$/i),
    ),
  password: joi.string().pattern(new RegExp(passwordRegex)).messages({
    "string.pattern.base":
      "Password must contain uppercase, lowercase, number and special character",
  }),
  newpassword: joi.string().pattern(new RegExp(passwordRegex)),

  phoneNumber: joi
    .string()
    .trim()
    .pattern(new RegExp(/^(\+2|002)?(01)[0125][0-9]{8}$/i)),

  gender: joi.string().valid("Male", "Female"),

  otp: joi.string().pattern(new RegExp(/^[0-9]{6}$/)),

  age: joi.number().integer().min(1).max(120),

  confirmPassword: joi
    .string()
    .pattern(new RegExp(passwordRegex))
    .valid(joi.ref("password"))
    .required()
    .messages({
      "any.only": "confirm password must be the same value as password",
    }),
  confirmnewpassword: joi
    .string()
    .pattern(new RegExp(passwordRegex))
    .valid(joi.ref("newpassword"))
    .required()
    .messages({
      "any.only": "confirm password must be the same value as newpassword",
    }),
};

export const capitalizeFullName = (name) => {
  if (!name || typeof name !== "string") {
    return ""; // Return an empty string if the input is invalid
  }
  return name
    .split(" ") // Split the name into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words back into a single string
};

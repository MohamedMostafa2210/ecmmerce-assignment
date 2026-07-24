import { roleEnum, userModel } from "../DB/models/User.Model.js";
import {
  asyncHandler,
  errResponse,
  successResponse,
} from "../utils/responses.js";
import * as DBservice from "../DB/db.service.js";
import { hashPassword, comparehash } from "../security/hashPassword.js";
import { generateToken, getSignature } from "../security/Token.js";
import { nanoid } from "nanoid";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errResponse({
      res,
      statusCode: 400,
      massage: "Email and Password Required",
    });
  }

  const user = await DBservice.findOne({ model: userModel, filter: { email } });
  if (!user) {
    return errResponse({
      res,
      statusCode: 400,
      massage: "invalid email or password",
    });
  }

  const isPassword = comparehash(password, user.password);
  if (!isPassword) {
    return errResponse({
      res,
      statusCode: 400,
      massage: "invalid email or password",
    });
  }

  const signatures = getSignature(user.role);
  const access_token = generateToken({
    payload: { _id: user._id },
    Signature: signatures.access_token_Signature,
    options: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIERS_IN || "1h",
      jwtid: nanoid(),
    },
  });

  const refresh_token = generateToken({
    payload: { _id: user._id },
    Signature: signatures.refresh_token_Signature,
    options: {
      expiresIn: process.env.REFRESH_TOKEN_EXPIERS_IN || "7d",
      jwtid: nanoid(),
    },
  });

  return successResponse({
    res,
    statusCode: 200,
    data: { access_token, refresh_token },
    message: "login Successfully",
  });
});

export const signup = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const isExist = await DBservice.findOne({
    model: userModel,
    filter: { email },
  });
  if (isExist) {
    return errResponse({
      res,
      statusCode: 400,
      massage: "user already exsist",
    });
  }

  const user = await DBservice.createOne({
    model: userModel,
    data: {
      firstname: firstname || "User",
      lastname: lastname || "Account",
      email,
      password: hashPassword(password),
    },
  });

  return successResponse({
    res,
    statusCode: 201,
    message: "user created successfully",
    data: user,
  });
});

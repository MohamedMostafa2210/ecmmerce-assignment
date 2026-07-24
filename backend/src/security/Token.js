import jwt from "jsonwebtoken";
import { roleEnum, userModel } from "../DB/models/User.Model.js";
import * as DBService from "../DB/db.service.js";

export const tokenTypeEnum = { access: "access", refresh: "refresh" };

export const generateToken = ({
  payload,
  Signature = process.env.USER_ACCESS_TOKEN_SIGNATURE,
  options,
} = {}) => {
  return jwt.sign(payload, Signature, options);
};

export const decodeToken = ({
  Token,
  Signature = process.env.USER_ACCESS_TOKEN_SIGNATURE,
} = {}) => {
  return jwt.verify(Token, Signature);
};

export const getSignature = (role = roleEnum.user) => {
  const Signatures = {
    access_token_Signature: undefined,
    refresh_token_Signature: undefined,
  };

  switch (role) {
    case roleEnum.user:
    case process.env.USER_KEY:
      Signatures.access_token_Signature =
        process.env.USER_ACCESS_TOKEN_SIGNATURE;
      Signatures.refresh_token_Signature =
        process.env.USER_REFRESH_TOKEN_SIGNATURE;
      break;
    case roleEnum.admin:
    case process.env.ADMIN_KEY:
      Signatures.access_token_Signature =
        process.env.ADMIN_ACCESS_TOKEN_SIGNATURE;
      Signatures.refresh_token_Signature =
        process.env.ADMIN_REFRESH_TOKEN_SIGNATURE;

      break;
  }

  return Signatures;
};

export const authToken = async ({ Signature, next, token } = {}) => {
  const tokenData = decodeToken({
    Token: token,
    Signature,
  });

  const user = await DBService.findOne({
    model: userModel,
    filter: { _id: tokenData._id },
  });

  if (!user) {
    return console.error("user not found");
  }
  return user;
};

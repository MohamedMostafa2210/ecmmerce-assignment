import { authToken, getSignature, tokenTypeEnum } from "../security/Token.js";
import { asyncHandler, errResponse } from "../utils/responses.js";

export const auth = (accessRoles = [], tokenType = tokenTypeEnum.access) => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    console.log("Authorization:", authorization);

    if (!authorization) {
      return errResponse({
        res,
        statusCode: 403,
        massage: "You must login first",
      });
    }

    const [bearerKey, token] = authorization.split(" ");

    let signature;
    if (tokenType == tokenTypeEnum.access) {
      const { access_token_Signature } = getSignature(bearerKey);
      signature = access_token_Signature;
    } else {
      const { refresh_token_Signature } = getSignature(bearerKey);
      signature = refresh_token_Signature;
    }
    if (!signature) {
      return errResponse({
        res,
        statusCode: 401,
        massage: "Invalid Bearer Key",
      });
    }

    if (!token) {
      return errResponse({
        res,
        statusCode: 401,
        massage: "Token is required",
      });
    }

    const user = await authToken({
      token,
      Signature: signature,
    });
    if (req.user?.changedCredentialsAt >= Date.now() * 1000) {
      return errResponse({
        res,
        statusCode: 401,
        massage: { msg: "you must login again" },
      });
    }
    if (accessRoles.length && !accessRoles.includes(user.role)) {
      return errResponse({
        res,
        statusCode: 403,
        massage: "Unauthorized",
      });
    }

    req.user = user;
    next();
  });
};

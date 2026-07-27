import { asyncHandler, errResponse } from "../utils/responses.js";

export const validation = (schema, source = "body") => {
  return asyncHandler(async (req, res, next) => {
    const data = {
      ...req.params,
      ...req.query,
      ...req.body,
    };
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
      return errResponse({
        res,
        statusCode: 400,
        massage: error.message,
      });
    }

    req[source] = value;
    return next();
  });
};
export const confirmOTP = () => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    const { otp } = req.body;

    if (!user.newEmailOTP) {
      return responses.errResponse({
        res,
        statusCode: 400,
        massage: "No OTP found. Please request a new OTP.",
      });
    }

    // Check if OTP has expired
    if (user.newEmailOTP.expiresAt <= Date.now()) {
      return responses.errResponse({
        res,
        statusCode: 400,
        massage: "OTP expired",
      });
    }

    // Verify the OTP
    const isOTP = comparehash(otp, user.newEmailOTP.otp);
    if (!isOTP) {
      return responses.errResponse({
        res,
        statusCode: 400,
        massage: "Invalid OTP",
      });
    }

    // Update the user's email confirmation status
    await DBservice.updateOne({
      model: userModel,
      filter: { email: user.email },
      data: { confirmEmailupdate: true, $unset: { newEmailOTP: "" } },
    });
    next();
  });
};

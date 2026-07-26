export const errResponse = ({
  error,
  res,
  statusCode = 500,
  massage = { msg: "invalid information" },
} = {}) => {
  res.status(statusCode).json({ massage, error });
};

export const successResponse = ({
  res,
  data,
  statusCode = 200,
  message = "login Successfully",
} = {}) => {
  res.status(statusCode).json({ message, data });
};
export const asyncHandler = (API) => {
  return async (req, res, next) => {
    try {
      await API(req, res, next);
    } catch (err) {
      console.error("========== ERROR ==========");
      console.error(err);
      console.error("===========================");

      return res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }
  };
};

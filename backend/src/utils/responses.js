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
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      return res
        .status(500)
        .json({ massage: err.message, err, stack: err.stack });
    });
  };
};

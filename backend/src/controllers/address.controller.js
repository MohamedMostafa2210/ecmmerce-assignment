import { addressModel } from "../DB/models/Address.Model.js";
import * as DBservice from "../DB/db.service.js";
import {
  asyncHandler,
  successResponse,
  errResponse,
} from "../utils/responses.js";

export const createAddress = asyncHandler(async (req, res) => {
  const address = await DBservice.createOne({
    model: addressModel,
    data: {
      ...req.body,
      userId: req.user._id,
    },
  });

  return successResponse({
    res,
    statusCode: 201,
    data: address,
    message: "Address added successfully",
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await DBservice.find({
    model: addressModel,
    filter: {
      userId: req.user._id,
    },
  });

  return successResponse({
    res,
    data: addresses,
    message: "Addresses fetched successfully",
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const result = await DBservice.updateOne({
    model: addressModel,
    filter: {
      _id: req.params.id,
      userId: req.user._id,
    },
    data: req.body,
  });

  if (!result.matchedCount) {
    return errResponse({
      res,
      statusCode: 404,
      massage: "Address not found",
    });
  }

  return successResponse({
    res,
    message: "Address updated successfully",
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const result = await DBservice.deleteOne({
    model: addressModel,
    filter: {
      _id: req.params.id,
      userId: req.user._id,
    },
  });

  if (!result.deletedCount) {
    return errResponse({
      res,
      statusCode: 404,
      massage: "Address not found",
    });
  }

  return successResponse({
    res,
    message: "Address deleted successfully",
  });
});

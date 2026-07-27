import express from "express";
import * as addressController from "../controllers/address.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const addressRouter = express.Router();

addressRouter.post("/add-address", auth(), addressController.createAddress);

addressRouter.get("/addresses", auth(), addressController.getAddresses);

addressRouter.patch("/addresses/:id", auth(), addressController.updateAddress);

addressRouter.delete("/addresses/:id", auth(), addressController.deleteAddress);

export default addressRouter;

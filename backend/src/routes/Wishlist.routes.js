import express from "express";
import * as WishlistController from "../controllers/Wishlist.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const Wishlist_router = express.Router();

// Wishlist
Wishlist_router.get("/wishlist", auth(), WishlistController.getWishlist);
Wishlist_router.post("/add-To-wishlist", auth(), WishlistController.addToWishlist);
Wishlist_router.delete(
  "/wishlist/:productId",
  auth(),
  WishlistController.removeFromWishlist,
);

export default Wishlist_router;

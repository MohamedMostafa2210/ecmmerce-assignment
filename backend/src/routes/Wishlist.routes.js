import express from "express";
import * as WishlistController from "../controllers/Wishlist.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const Wishlist_router = express.Router();

Wishlist_router.get("/wishlist", auth(), WishlistController.getWishlist);

Wishlist_router.post(
  "/add-To-wishlist",
  auth(),
  WishlistController.addToWishlist,
);

Wishlist_router.delete(
  "/wishlist/:productId",
  auth(),
  WishlistController.removeFromWishlist,
);

// NEW
Wishlist_router.delete("/wishlist", auth(), WishlistController.clearWishlist);

export default Wishlist_router;

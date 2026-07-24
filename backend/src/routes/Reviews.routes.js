import express from "express";
import * as ReviewsController from "../controllers/Reviews.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleEnum } from "../DB/models/User.Model.js";

const Reviews_router = express.Router();

// Reviews
Reviews_router.post("/add-review", auth(), ReviewsController.createReview);
Reviews_router.get("/reviews/:productId", ReviewsController.getReviews);
Reviews_router.patch("/reviews/:id", auth(), ReviewsController.updateReview);
Reviews_router.delete("/reviews/:id", auth(), ReviewsController.deleteReview);

export default Reviews_router;

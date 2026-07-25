import express from "express";
import userRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import brandRouter from "./src/routes/Brand.routes.js";
import subCategoryRouter from "./src/routes/Sub_Category.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import wishlistRouter from "./src/routes/Wishlist.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import reviewRouter from "./src/routes/Reviews.routes.js";
import dashboardRouter from "./src/routes/Dashboard.routes.js";
import { connectDB } from "./src/config/database.js";
import { config } from "dotenv";
import path from "path";
import cors from "cors";
config({
  path: path.resolve(".env"),
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
connectDB();
app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandRouter);
app.use("/Sub-Category", subCategoryRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);
app.use("/dashboard", dashboardRouter);

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    app.listen(++port);
  }
});

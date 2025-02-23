import express from "express";
import { deleteProduct, getProduct, getProducts, postProduct, putProduct } from "../controllers/product.controller.js";

const productRoutes = express.Router();

// Get products
productRoutes.get("/", getProducts);
// Get product
productRoutes.get("/:id", getProduct);
// Post product
productRoutes.post("/", postProduct);
// Put product
productRoutes.put("/:id", putProduct);
// Delete product
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

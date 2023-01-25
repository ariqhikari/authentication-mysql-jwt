import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import { verifyToken } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/products", verifyToken, getProducts);
router.get("/products/:id", verifyToken, getProductById);
router.post("/products", verifyToken, createProduct);
router.patch("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

export default router;

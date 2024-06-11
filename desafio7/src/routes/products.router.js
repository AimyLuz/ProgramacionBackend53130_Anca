import express from "express";
import ProductsController from "../controllers/products.controller.js";
const pc = new ProductsController();
const router = express.Router();

router.get("/", pc.getProductsApi.bind(pc));
router.get("/:pid", pc.getProductById.bind(pc));
router.post("/", pc.addProduct.bind(pc));
router.put("/:pid", pc.updateProduct.bind(pc));
router.delete("/:pid", pc.deleteProduct.bind(pc));

export default router;
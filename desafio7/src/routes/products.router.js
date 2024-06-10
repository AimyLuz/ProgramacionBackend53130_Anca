
//products.router.js
import express from "express";
import ProductsController from "../controllers/products.controller.js";
const pc = new ProductsController();
const router = express.Router();

router.get("/", pc.getProducts.bind(pc));
router.get("/:pid", pc.getProductById.bind(pc));
router.post("/", pc.addProduct.bind(pc));
router.put("/:pid", pc.updateProduct.bind(pc));
router.delete("/:pid", pc.deleteProduct.bind(pc));

/*
PARA ACTUALIZAR EL PRODUCTO SE ESCRIBE CON EL SIGUIENTE FORMATO:
{
    "campo": "price",
    "valor": 2222
}
*/


export default router;

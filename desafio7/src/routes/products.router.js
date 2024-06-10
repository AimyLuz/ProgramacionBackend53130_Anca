
//products.router.js
import express from "express";
import ProductsController from "../controllers/products.controller.js";
const pc = new ProductsController();
const router = express.Router();

router.get("/", pc.getProducts);
router.get("/:pid", pc.getProductById);
router.post("/", pc.addProduct);
router.put("/:pid", pc.updateProduct);
router.delete("/:pid", pc.deleteProduct);

/*
PARA ACTUALIZAR EL PRODUCTO SE ESCRIBE CON EL SIGUIENTE FORMATO:
{
    "campo": "price",
    "valor": 2222
}
*/


export default router;

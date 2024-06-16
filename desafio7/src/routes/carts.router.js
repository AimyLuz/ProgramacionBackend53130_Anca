//carts-manager-db.js
import express from "express";
const router = express.Router();
import CartsController from "../controllers/carts.controller.js";

/*
const cc = new CartsController();

//Comenzar carrito nuevo 
router.post("/", cc.addCart)
//2.borrar carrito
router.delete("/:cid", cc.deleteCart)
//3. Agregar productos al carrito
router.post("/:cid/product/:pid", cc.addProductToCart);
//4.Ver carritos
router.get("/", cc.getCarts)
//5.Buscar mi carrito
router.get("/:cid", cc.getCartById);
//6) Eliminamos un producto especifico del carrito: 
router.delete('/:cid/product/:pid', cc.deleteProductCart);
//7) Actualizamos productos del carrito: 
router.put('/:cid', cc.updateCart)
//8) Actualizamos las cantidades de productos
router.put('/:cid/product/:pid', cc.updateProductsQuantityCart);
//9) Vaciamos el carrito: 
router.delete('/:cid', cc.emptyCart);


*/
const cartsController = new CartsController();

router.post('/', cartsController.addCart);
router.delete('/:cid', cartsController.deleteCart);
router.post('/:cid/product/:pid', cartsController.addProductToCart);
router.get('/', cartsController.getCarts);
router.get('/:cid', cartsController.getCartById);
router.delete('/:cid/product/:pid', cartsController.deleteProductFromCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/product/:pid', cartsController.updateProductsQuantityCart);
router.put('/:cid/empty', cartsController.emptyCart);
export default router;


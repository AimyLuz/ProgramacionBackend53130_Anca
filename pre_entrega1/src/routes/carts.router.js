
import express from "express";
import path from "path";
import CartManager from "../cartmanager.js";
import { getCurrentDirname } from '../utils.js'; // Importa solo la función getCurrentDirname

const __dirname = getCurrentDirname(import.meta.url);
const router = express.Router();

const cm = new CartManager("./src/carrito.json");


//Comenzar carrito nuevo 
router.post("/carts", async (req,res)=>{
    try{
        cm.addCart(req.body);
        res.status(200).send("Se agregó correctamente el carrito");
    }catch(error){
        res.status(500).send("Error al agregar el producto");
    }
});

//Agregar productos al carrito
router.post("/carts/:cid/product/:pid", async (req,res)=>{
    try{
        const cartId = parseInt(req.params.cid);
		const productId = parseInt(req.params.pid);
		cm.updateCart(cartId, productId);
		res.status(200).send("Producto añadido al carrito");
    }catch(error){
        res.status(500).send("Error al cargar el producto");
    }
});


//Ver carritos
router.get("/carts", async (req,res)=>{
    try{
        const listaCarritos = await cm.getCarts();
        res.status(200).send(listaCarritos);
    }catch(error){
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

//Buscar mi carrito
router.get("/carts/:cid", async (req,res)=>{
    try{
        const carritoId = parseInt(req.params.cid);
        console.log(parseInt(req.params.cid));
        const traerCarrito = await cm.getCartById(carritoId);
        res.send(traerCarrito);
    }catch(error){
        console.error(error.message); 
        res.status(404).send("Producto no encontrado"); 
    }
});


//Borrar carrito
router.delete("/carts/:cid", async (req,res)=>{
    try{
    const cartId = parseInt(req.params.cid);
    cm.deleteCart(cartId)
    res.status(200).send("Carrito ELiminado")
    }catch(error){
        res.status(500).send("Error al eliminar el carrito");
    }
});

//Borrar producto del carrito
router.delete("/carts/:cid/products/:pid", (req,res)=>{
    try{
        let productId = parseInt(req.params.pid)
        pml.deleteProduct(productId)
        res.status(200).send("Producto eliminado");
    }catch(error){
        res.status(500).send("Error al eliminar el producto");
    }
  });
export default router;


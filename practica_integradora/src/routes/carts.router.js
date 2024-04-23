
import express from "express";
import CartManager from "../controllers/carts-manager-db.js";
const cm = new CartManager();

const router = express.Router();


//Comenzar carrito nuevo 
router.post("/", async (req,res)=>{
    try{
        const respuesta = await cm.addCart(req.body);
        if (respuesta.status) {
            res.status(200).send(respuesta);
        } else {
            res.status(400).send(respuesta);
        }
    }catch(error){
        res.status(500).send("Error interno del servidor: " + error.message);
    }
});

//Agregar productos al carrito
router.post("/:cid/product/:pid", async (req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try{

        const respuesta = await cm.addProductToCart(cartId, productId, quantity);
        if (respuesta.status) {
            res.status(200).send(respuesta.products);
        } else {
            res.status(400).send(respuesta.products);
        }
    }catch(error){
        res.status(500).send("Error interno del servidor: " + error.message);
    }
});


//Ver carritos
router.get("/", async (req,res)=>{
    try{
        const listaCarritos = await cm.getCarts();
        res.status(200).send(listaCarritos);
    }catch(error){
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

//Buscar mi carrito
router.get("/:cid", async (req,res)=>{
    try{
        const carritoId = req.params.cid;
        console.log(req.params.cid);
        const traerCarrito = await cm.getCartById(carritoId);
        if(traerCarrito){
            res.json({ status: true, traerCarrito });
        }else{
            res.status(404).json({ status: false, msg: "Carrito no encontrado" });
        }
    }catch(error){
        console.error(error.message); 
        res.status(500).json({ status: false, msg: "Error al obtener carrito" });
    }
});

export default router;


import express from "express";
const router = express.Router(); 
import ProductManager from "../controllers/products-manager-db.js";
const pm = new ProductManager();
import ProductsModel from "../models/products.model.js";

router.get("/",  async (req, res) => {
    try {
        const productList = await ProductsModel.find(); // Obtén todos los productos
        res.render("home", { products: productList }); // Pasa el arreglo de productos a la vista
      } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error interno del servidor");
      }
});

router.get("/socket", async (req, res) => {
    try{
        res.render("socket");
    }catch(error){
        res.status(500).json({error: "Error interno del servidor"})
    }
  });

  router.get("/realTimeProducts", async (req, res) => {
    try{
        const products = await pm.getProduct();
        res.render("realTimeProducts", { products:products });
    }catch(error){
        res.status(500).json({error: "Error interno del servidor"})
    }
  });

  router.get("/chat", async (req, res) => {
    res.render("chat");
 })
 




export default router;
import express from "express";
const router = express.Router(); 
import ProductManager from "../controllers/products-manager-db.js";
const pm = new ProductManager();
import ProductsModel from "../models/products.model.js";

router.get("/",  async (req, res) => {
    try {
        const productList = await pm.getProduct(); // Obtén todos los productos
        res.render("home", { products: productList }); // Pasa el arreglo de productos a la vista
      } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error interno del servidor");
      }
});
router.get("/products",  async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const productList = await pm.getProduct({
       page: parseInt(page),
       limit: parseInt(limit)
    });

    const nuevoArray = productList.docs.map(producto => {
       const { _id, ...rest } = producto.toObject();
       return rest;
    });

    res.render("home", {
       products: nuevoArray,
       hasPrevPage: productList.hasPrevPage,
       hasNextPage: productList.hasNextPage,
       prevPage: productList.prevPage,
       nextPage: productList.nextPage,
       currentPage: productList.page,
       totalPages: productList.totalPages
    });

 } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
       status: 'error',
       error: "Error interno del servidor"
    });
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
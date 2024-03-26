import express from "express";
import path from "path";
import ProductManager  from "../productmanager.js";
import { getCurrentDirname } from '../utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);


const router = express.Router();

const pml = new ProductManager(path.join(__dirname, "../listadoDeProductos.json"));

router.get("/",  async (req, res) => {
    try {
        const products = await pml.getProduct();
        res.render("home", {products:products});
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor intentando mostrar productos"})
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
        const products = await pml.getProduct();
        res.render("realTimeProducts", { products:products });
    }catch(error){
        res.status(500).json({error: "Error interno del servidor"})
    }
  });

  export default router;
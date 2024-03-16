import express from "express";
import path from "path";
import ProductManager  from "../productmanager.js";
import { getCurrentDirname } from '../utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);
/*
const express = require('express');
const path = require("path");
const ProductManager = require('../productmanager');*/


const router = express.Router();

const pml = new ProductManager(path.join(__dirname, "../listadoDeProductos.json"));



//esto va a ir a products router
router.get("/api/products", async (req, res) => {
    try {
          // Llamado a productManager
      let productList = await pml.getProduct();
      //limite query
      const { limit } = req.query;
      if (!limit) {
        res.send(productList);//enviar todos los productos
      } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
        res.send(productList.slice(0, limit)); //transformar en numero el string y enviar el limit
      } else {
        res.send(`El límite ${limit} es inválido.`);//ingreso de datos no validos
      }
    } catch (error) {
      // Salida
      // Manejar errores aquí
      console.error(error);i
      res.status(500).send("Error interno del servidor");
    }
  });
  
  router.get("/api/products/:pid", async (req, res) => {
    try {
        let productId = parseInt(req.params.pid);
        console.log(parseInt(req.params.pid));
      // Llamado a productManager
  
      let productList =  await pml.getProductById(productId);
      // Salida
      res.send(productList);
    } catch (error) {
      // Manejar errores aquí
      console.error(error.message); // Imprime el mensaje de error en la consola
      res.status(404).send("Producto no encontrado"); // Envía una respuesta 404 al cliente
    }
  });

  //AGREGAR PRODUCTOS
  router.post("/api/products", async (req,res)=>{
    try{
        let {title, description, price, thumbnail, code, stock, status, category}= req.body;
        pml.addProduct(title, description, price, thumbnail, code, stock, status, category);
        res.status(200).send("Producto agregado con exito");
    }catch (error){
        res.status(500).send("Error al agregar el producto")
    }
  });
//ACTUALIZAR PRODUCTOS 
  router.put("/api/products/:pid",(req,res)=>{
    try{
        let productId = parseInt(req.params.pid);
        pml.updateProduct(productId, req.body);
        res.status(200).send("Producto actualizado");

    }catch(error){
        res.status(500).send("Error al obtener el producto");
    }
  });

  router.delete("/api/products/:pid", (req,res)=>{
    try{
        let productId = parseInt(req.params.pid)
        pml.deleteProduct(productId)
        res.status(200).send("Producto eliminado");
    }catch(error){
        res.status(500).send("Error al eliminar el producto");
    }
  });

export default router;
//module.exports = router;
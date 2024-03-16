import  ProductManager  from "./productmanager.js";
import express from "express";
//import multer from "multer"
import { getCurrentDirname } from './utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);

import path from "path";
import routerProducts from "./routes/products.router.js"
//import routerCarts from "./routes/carts.router.js"

/*const ProductManager = require("./productmanager.js");
const express = require("express");
const path = require("path");
const routerProducts = require('./routes/products.router.js');
//const routerCarts = require('./routes/carts.router.js')*/

const app = express();
const port = 8080;
const productos = new ProductManager(path.join(__dirname, "./listadoDeProductos.json"));



//Middleware 
app.use(express.json())
//Voy a utilizar JSON para datos. 
app.use(express.urlencoded({extended:true}));


app.use(routerProducts);
//app.use(routerCarts);



/* --------Test de vida del servidor---------- */
app.get("/ping", (req, res) => {
  res.send("Pong");
});
/* ------------------------------------------- */


//Raiz
app.get('/', (req, res)=>{
  res.status(200).send('<h1>Primer Pre entrega Ayelén Anca </h1>')
});
app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`);
});

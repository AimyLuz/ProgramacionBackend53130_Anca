const express = require('express');
const router = express.Router();
const path = require("path");
const ProductManager = require('../productmanager');
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

  module.exports = router;
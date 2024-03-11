const ProductManager = require("./productmanager.js");
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;


const productos = new ProductManager(path.join(__dirname, "./listadoDeProductos.json"));


app.get("/ping", (req, res) => {
  res.send("Pong");
});
app.get("/products", async (req, res) => {
  try {
        // Llamado a productManager
    let productList = await productos.getProduct();
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

app.get("/products/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    // Llamado a productManager

    let productList =  await productos.getProductById(id);
    // Salida
    res.send(productList);
  } catch (error) {
    // Manejar errores aquí
    console.error(error.message); // Imprime el mensaje de error en la consola
    res.status(404).send("Producto no encontrado"); // Envía una respuesta 404 al cliente
  }
});



app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`);
});

//views.router.js

import express from "express";
import ProductsController from "../controllers/products.controller.js";
const router = express.Router(); 
const pc = new ProductsController();
import CartsController from "../controllers/carts.controller.js";

const cc = new CartsController();


router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 2, sort, query } = req.query; // Incluye query y sort
    const productList = await pc.getProducts({ page: parseInt(page), limit: parseInt(limit), sort, query });

    if (!productList || !productList.docs || !Array.isArray(productList.docs)) {
      throw new Error("Lista de productos no es válida");
    }

    res.render("home", {
      user: req.session.user,
      products: productList.docs, // Muestra los productos
      hasPrevPage: productList.hasPrevPage,
      hasNextPage: productList.hasNextPage,
      prevPage: productList.prevPage,
      nextPage: productList.nextPage,
      currentPage: productList.page,
      totalPages: productList.totalPages,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});
router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 2, sort, query } = req.query; // Incluye query y sort
    const productList = await pc.getProducts({ page: parseInt(page), limit: parseInt(limit), sort, query });

    if (!productList || !productList.docs || !Array.isArray(productList.docs)) {
      throw new Error("Lista de productos no es válida");
    }

    res.render("products", {
      user: req.session.user,
      products: productList.docs, // Muestra los productos
      hasPrevPage: productList.hasPrevPage,
      hasNextPage: productList.hasNextPage,
      prevPage: productList.prevPage,
      nextPage: productList.nextPage,
      currentPage: productList.page,
      totalPages: productList.totalPages,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//pagina de carritos
router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const resultado = await  cc.getCartById(cartId); // Verifica que se devuelve un resultado
    const carrito = resultado && resultado.cart; // Asegúrate de obtener `cart`


    if (!carrito || !Array.isArray(carrito.products) || carrito.products.length === 0) { // Verificar si tiene productos
      return res.status(404).json({ error: "Carrito no encontrado o sin productos" }); // Manejar el error
    }
    const productosEnCarrito = carrito.products.map(item => ({
      product: item.product.toObject(), // Verificar que `product` es un documento completo
      quantity: item.quantity
    }));
  
     /* if (product.toObject) {
        return {
          product: product.toObject(), // Solo llama a `toObject` si es un documento Mongoose
          quantity: item.quantity
        };
      } else {
        return {
          product: product, // Devolver tal cual si no es un documento Mongoose
          quantity: item.quantity
        };
      }*/
     res.render("carts", { productos: productosEnCarrito });
  } catch (error) {
     console.error("Error al obtener el carrito", error);
     res.status(500).json({ error: "Error interno del servidor" });
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
        const products = await pc.getProducts();
        res.render("realTimeProducts", { products:products });
    }catch(error){
        res.status(500).json({error: "Error interno del servidor"})
    }
  });

  router.get("/chat", async (req, res) => {
    res.render("chat");
 })
 
router.get("/login", (req,res)=>{
  res.render("login");
});
router.get("/register", (req,res)=>{
  res.render("register");
});
router.get("/profile", (req,res)=>{

    if(!req.session.login){
      return res.redirect("/login")
    }else {
      res.render("profile" , {
        user: req.session.user
      });
    }
  
});



export default router;
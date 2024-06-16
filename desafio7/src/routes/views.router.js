//views.router.js

import express from "express";
import ProductsController from "../controllers/products.controller.js";
const router = express.Router(); 
const pc = new ProductsController();
import CartsController from "../controllers/carts.controller.js";
import ProductsService from "../service/products.service.js";
const cc = new CartsController();
const ps = new ProductsService();

router.get("/", pc.getProductsView);

//Ver mi carrito
router.get("/cart/:cid", cc.getCartById);

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
router.get("/socket", async (req, res) => {
  try{
      res.render("socket");
  }catch(error){
      res.status(500).json({error: "Error interno del servidor"})
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try{
      const products = await ps.getProducts();
      res.render("realTimeProducts", { products:products });
  }catch(error){
      res.status(500).json({error: "Error interno del servidor"})
  }
});


export default router;
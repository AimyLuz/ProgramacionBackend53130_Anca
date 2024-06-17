//views.router.js
import express from 'express';
import ProductsController from '../controllers/products.controller.js';
import authMiddleware from '../middleware/authmiddleware.js';
import checkUserRole from '../middleware/checkrole.js';
import CartsController from '../controllers/carts.controller.js';
import ProductsService from '../service/products.service.js';
import passport from 'passport';
import ViewsController from '../controllers/views.controller.js';
const router = express.Router();
const pc = new ProductsController();
const cc = new CartsController();
const ps = new ProductsService();

router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), ViewsController.renderProducts);

router.get("/carts/:cid", ViewsController.renderCart);
router.get("/login", ViewsController.renderLogin);
router.get("/register", ViewsController.renderRegister);
router.get("/realtimeproducts", checkUserRole(['admin']), ViewsController.renderRealTimeProducts);
router.get("/chat", checkUserRole(['usuario']) ,ViewsController.renderChat);
router.get("/", ViewsController.renderHome);


export default router;
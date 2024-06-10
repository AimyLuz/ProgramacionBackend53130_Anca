import CartsService from "../service/carts.service.js";
import mongoose from "mongoose";

const cs = new CartsService();

class CartsController {
    // 1. Comenzar carrito nuevo 
    async addCart(req, res) {
        try {
            const respuesta = await cs.addCart(req.body);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 2. Borrar carrito
    async deleteCart(req, res) {
        try {
            const respuesta = await cs.deleteCart(req.params.cid);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 3. Agregar productos al carrito
    async addProductToCart(req, res) {
        try {
            const respuesta = await cs.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 4. Mostrar carritos
    async getCarts(req, res) {
        try {
            const respuesta = await cs.getCarts();
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 5. Mostrar carrito según ID
    async getCartById(req, res) {
        try {
            const respuesta = await cs.getCartById(req.params.cid);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 6. Borrar un producto del carrito
    async deleteProductFromCart(req, res) {
        try {
            const respuesta = await cs.deleteProductCart(req.params.cid, req.params.pid);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 7. Actualizar productos del carrito
    async updateCart(req, res) {
        try {
            const respuesta = await cs.updateCart(req.params.cid, req.body);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 8. Actualizar la cantidad de productos de un carrito
    async updateProductsQuantityCart(req, res) {
        try {
            const respuesta = await cs.updateProductsQuantityCart(req.params.cid, req.params.pid, req.body.newQuantity);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }

    // 9. Vaciar carrito
    async emptyCart(req, res) {
        try {
            const respuesta = await cs.emptyCart(req.params.cid);
            if (respuesta.status) {
                res.status(200).send(respuesta);
            } else {
                res.status(400).send(respuesta);
            }
        } catch (error) {
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    }
}

export default CartsController;
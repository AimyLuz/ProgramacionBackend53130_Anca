import fs from "fs";
import ProductManager from "./productmanager.js";
import path from "path";
import { getCurrentDirname } from './utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);
const pml = new ProductManager(path.join(__dirname, "./listadoDeProductos.json"));


class CartManager{
    constructor(archivo) {
        this.path = archivo;
        this.initCarts();
        
    }
    static id = 0;

    async initCarts(){
        try {
            // Verificar si el archivo existe
            const fileExists = fs.existsSync(this.path);
            if (!fileExists) {
                // Si el archivo no existe, crear uno nuevo con una lista vacía de productos
                await fs.promises.writeFile(this.path, '[]');
                return this.carts = [];
            } else {
                // Si el archivo existe, leer los productos desde el archivo
                this.carts = await this.getCarts();
                if (this.carts.length === 0) {
                    // Si no hay productos, establecer el ID base en 0
                    CartManager.id = 0;
                }
            }
        } catch (error) {
            throw new Error("Error al inicializar los carritos:", error);
        }
    };

    async addCart(){
        try {
            let colecciones = this.carts;
            const maxId = colecciones.reduce((max, cart) => Math.max(max, cart.id), 0);
            const newId = maxId + 1;
            colecciones.push({...{id: newId, products: []}})
            await fs.promises.writeFile(this.path, JSON.stringify(colecciones));
            this.carts = colecciones; // Actualizar this.carts
            console.log(`Se agregó el carrito con id "${CartManager.id}" a la colección`);
        } catch (error) {
            throw new Error("Error al agregar el carrito:", error);
        }
    };

    async getCarts(){
        try{
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        }catch(error){
            throw new Error("Error al intentar mostrar carritos:", error)
        };

    };

    async getCartById(id){
        try {
            await this.initCarts(); // Esperar a que se carguen los productos antes de buscar por ID
            const cart = this.carts.find((cart) => cart.id == id);
            if (!cart) {
                console.log(`Carrito con ID "${id}" no encontrado, intente con otro ID`);
            } else {
                console.log(cart);
                return cart;
            }
        } catch (error) {
            throw new Error("Error al intentar mostrar el carrito:", error);
        }
    };

    async deleteCart(id){
        try{
            if (!this.carts.find((cart) => cart.id == id)) {
                return console.log(`Carrito con ID "${id}" no encontrado, intente con otro ID`)}
           
                let colecciones = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                let listaNueva = colecciones.filter((i) => i.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(listaNueva));
                console.log(`Carrito ${id} eliminado`)
        }catch(error){
            throw new Error("Error al intentar borrar el carrito:", error)
        }
    };

    async updateCart(cartId, productId){
        try {
            const carts = await this.getCarts();
            const product = await pml.getProductById(productId);
            const cartIndex = carts.findIndex((cart) => cart.id == cartId);
            if (cartIndex === -1) {
                console.log(`Carrito con ID "${cartId}" no encontrado.`);
                return;
            }
            const productIndex = carts[cartIndex].products.findIndex((prod) => prod.productId == productId);
            if (productIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                carts[cartIndex].products[productIndex].quantity++;
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                carts[cartIndex].products.push({ productId, quantity: 1 });
            }
    
            // Guardar los cambios en el archivo
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            console.log(`Producto "${product.title}" agregado al carrito "${cartId}".`);
        } catch (error) {
            throw new Error("Error al intentar modificar el carrito:", error);
        }
    }

};

export default CartManager;

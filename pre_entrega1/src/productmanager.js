import fs from "fs";
import path from "path";
/*
const fs = require("fs");
const path = require("path");*/
 class ProductManager {
    constructor(archivo) {
        this.path = archivo;
        this.initProducts();
        
    }
    static id = 0;
    async initProducts() {
        try {
            // Verificar si el archivo existe
            const fileExists = fs.existsSync(this.path);
            if (!fileExists) {
                // Si el archivo no existe, crear uno nuevo con una lista vacía de productos
                await fs.promises.writeFile(this.path, '[]');
                return this.products = [];
            } else {
                // Si el archivo existe, leer los productos desde el archivo
                this.products = await this.getProduct();
            }
            if (this.products.length > 0) {
                // Calcular el ID máximo actual
                const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
                // Actualizar el ID base
                ProductManager.id = maxId + 1;
            }
        } catch (error) {
            throw new Error("Error al inicializar los productos:", error);
        }
    }
    async addProduct(title, description, price, thumbnail= [], code, stock, status, category) {
        try {
            let colecciones = this.products;
            if (colecciones.some((i) => i.code === code)) {
                console.log(`Error, el code ${code} está repetido.`);
                return; // Retorno temprano si el código está repetido
            }
            const newProduct = { title, description, price, thumbnail, code, stock, status, category };
            if (Object.values(newProduct).includes(undefined)) {
                console.log('Por favor, completar los campos faltantes para poder agregar el producto');
                return; // Retorno temprano si hay campos faltantes
            }
            console.log(newProduct);
            const newId = ++ProductManager.id;
            colecciones.push({
                ...newProduct,
                id: newId,
            });
            await fs.promises.writeFile(this.path, JSON.stringify(colecciones));
            this.products = colecciones; // Actualizar this.products
        } catch (error) {
            throw new Error("Error al agregar el producto:", error);
        }
    }
    
    async getProduct() {
        try{
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        }catch(error){
            throw new Error("Error al intentar mostrar productos:", error)
        };

    }
    async getProductById(id) {
        try {
            await this.initProducts(); // Esperar a que se carguen los productos antes de buscar por ID
            const producto = this.products.find((producto) => producto.id == id);
            if (!producto) {
                console.log(`Producto con ID "${id}" no encontrado, intente con otro ID`);
            } else {
                console.log(producto);
                return producto;
            }
        } catch (error) {
            throw new Error("Error al intentar mostrar el producto:", error);
        }
    }
    
   async deleteProduct(id) {
        try{
            if (!this.products.find((producto) => producto.id == id)) {
                return console.log(`Producto con ID "${id}" no encontrado, intente con otro ID`)}
           
                let colecciones = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                let listaNueva = colecciones.filter((i) => i.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(listaNueva));
                console.log(`Producto ${id} eliminado`)
        }catch(error){
            throw new Error("Error al intentar borrar el producto:", error)
        }
       
        
    }
   async updateProduct(id, campo, valor){
        try{
            let colecciones = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        let numeroIndex = colecciones.findIndex((i)=> i.id == id);
    if(numeroIndex === -1){
        return console.log(`Not Found id: ${id}`)
    }
    colecciones[numeroIndex][campo] = valor;
    await fs.promises.writeFile(this.path, JSON.stringify(colecciones))
    this.products = colecciones;
    console.log(`Producto ${id} elditado`)
        }catch(error){
            throw new Error("Error al intentar modificar el producto:", error)
        }
    }
};

export default ProductManager;
//module.exports = ProductManager;


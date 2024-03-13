const fs = require("fs");
const path = require("path");
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
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let colecciones = this.products;
            if (colecciones.some((i) => i.code === code)) {
                console.log(`Error, el code ${code} está repetido.`);
                return; // Retorno temprano si el código está repetido
            }
            const newProduct = { title, description, price, thumbnail, code, stock };
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

/*
const productos = new ProductManager(path.join(__dirname, "./listadoDeProductos.json"));
test = async () => {
//TESTING
//Primer llamada = arreglo vacio
try{
    //Primer llamada = arreglo vacio
    console.log("Primer llamado Array vacio")
    console.log( await productos.getProduct());
    
    //Agrego productos
    console.log("Agregamos productos")
    await productos.addProduct("Manzana", "es una fruta, puede ser roja o verde", 500, "Imaginate una foto de una manzana", "abc123", 20);
    await productos.addProduct("Pera", "es una fruta, hace bien si estas mal de la panza", 400, "FotoDePera", "abc124", 30);
    await productos.addProduct("Lechuga", "es una verdura verde", 100, "imagenLechu", "abc126", 50)
    await productos.addProduct("Frutilla", "es una fruta rica con crema", 700, "FotoDeFrutilla", "abc125", 30);
    
    //Validacio de codigo repetido
    console.log("Intentamos agregar un producto con el codigo repetido")
    await productos.addProduct("Gato", "es un animal", 0, "FotoDeGatito", "abc123", 1);
    
    //Segundo llamado de productos
    console.log("Listado de productos 2do llamado");
    console.log( await productos.getProduct());
    
    //Validación de campos faltantes
    console.log("Se va a enviar un producto con campos faltantes")
    await productos.addProduct("MotoG82", 50000, "ImagenMotoG", "aaabbb", 30);
    
    //buscar productos por ID
    console.log("Se va a buscar un producto que existe por el ID")
    await productos.getProductById(2);
    
    //Producto no encontrado
    console.log("Se va a buscar un producto que NO existe por el ID")
    await productos.getProductById(5);
    
    
    //Probamos eliminar un producto
    console.log("Probamos eliminar la frutilla");
    await productos.deleteProduct(4)
    
    //Probamos que pasa si no encuentra el id del producto a eliminar
    console.log("probamos buscar un id que no existe para eliminar")
    await productos.deleteProduct(15)
    
    //Probamos editar un producto
    console.log("probamos editar la lechuga")
    await productos.updateProduct(3, "price", 200)
    
    //Probamos que pasa si no encuentra el id del producto a editar
    console.log("probamos buscar un id que no existe para editar");
    await productos.deleteProduct(8, "price", 52);
    }catch(error){
        console.error("Error en la prueba:", error);
    }
    };
    test();
*/
module.exports = ProductManager;


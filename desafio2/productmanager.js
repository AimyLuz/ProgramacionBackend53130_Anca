const fs = require("fs");

class ProductManager {
    constructor(archivo) {
        this.path = archivo;
        this.products = [];
        
    }
    static id = 0;
    addProduct(title, description, price, thumbnail, code, stock) {
        let colecciones = this.products;
        if (colecciones.some((i) => i.code === code)) {
            console.log(`Error, el code ${code} está repetido.`);
            return; // Retorno temprano si el código está repetido
        }
        const newProduct = { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock };
        if (Object.values(newProduct).includes(undefined)) {
            console.log('Por favor, completar los campos faltantes para poder agregar el producto');
            return; // Retorno temprano si hay campos faltantes
        }
        console.log(newProduct);
        const newId = colecciones.reduce((idMax, product) => idMax > product.id ? idMax : product.id, 0) + 1;
        ProductManager.id++;
        colecciones.push({
            ...newProduct,
            id: newId,
        });
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
    
    getProduct() {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));

    }
    getProductById(id) {
        if (!this.products.find((producto) => producto.id == id)) {
            console.log(`Producto con ID "${id}" no encontrado, intente con otro ID`)
        } else {
            console.log(this.products.find((producto) => producto.id == id));
        }

    }
    deleteProduct(id) {
        if (!this.products.find((producto) => producto.id == id)) {
            return console.log(`Producto con ID "${id}" no encontrado, intente con otro ID`)}
       
            let colecciones = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            let listaNueva = colecciones.filter((i) => i.id !== id);
            fs.writeFileSync(this.path, JSON.stringify(listaNueva));
            console.log(`Producto ${id} eliminado`)
        
    }
    updateProduct(id, campo, valor){
        let colecciones = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let numeroIndex = colecciones.findIndex((i)=> i.id == id);
    if(numeroIndex === -1){
        return console.log(`Not Found id: ${id}`)
    }
    colecciones[numeroIndex][campo] = valor;
    fs.writeFileSync(this.path, JSON.stringify(colecciones))
    console.log(`Producto ${id} elditado`)
    }
};
const productos = new ProductManager("./listadoDeProductos.json");

//TESTING
//Primer llamada = arreglo vacio
console.log("Primer llamado Array vacio")
console.log(productos.getProduct());

//Agrego productos
console.log("Agregamos productos")
productos.addProduct("Manzana", "es una fruta, puede ser roja o verde", 500, "Imaginate una foto de una manzana", "abc123", 20);
productos.addProduct("Pera", "es una fruta, hace bien si estas mal de la panza", 400, "FotoDePera", "abc124", 30);
productos.addProduct("Lechuga", "es una verdura verde", 100, "imagenLechu", "abc126", 50)
productos.addProduct("Frutilla", "es una fruta rica con crema", 700, "FotoDeFrutilla", "abc125", 30);

//Validacio de codigo repetido
console.log("Intentamos agregar un producto con el codigo repetido")
productos.addProduct("Gato", "es un animal", 0, "FotoDeGatito", "abc123", 1);

//Segundo llamado de productos
console.log("Listado de productos 2do llamado");
console.log(productos.getProduct());

//Validación de campos faltantes
console.log("Se va a enviar un producto con campos faltantes")
productos.addProduct("MotoG82", 50000, "ImagenMotoG", "aaabbb", 30);

//buscar productos por ID
console.log("Se va a buscar un producto que existe por el ID")
productos.getProductById(2);

//Producto no encontrado
console.log("Se va a buscar un producto que NO existe por el ID")
productos.getProductById(5);


//Probamos eliminar un producto
console.log("Probamos eliminar la frutilla");
productos.deleteProduct(4)

//Probamos que pasa si no encuentra el id del producto a eliminar
console.log("probamos buscar un id que no existe para eliminar")
productos.deleteProduct(15)

//Probamos editar un producto
console.log("probamos editar la lechuga")
productos.updateProduct(3, "price", 200)

//Probamos que pasa si no encuentra el id del producto a editar
console.log("probamos buscar un id que no existe para editar");
productos.deleteProduct(8, "price", 52);
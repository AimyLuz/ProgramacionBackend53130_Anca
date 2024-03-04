class ProductManager {
    constructor() {
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
    }
    
    getProduct() {
        return this.products
    }
    getProductById(id) {
        if (!this.products.find((producto) => producto.id == id)) {
            console.log(`Producto con ID "${id}" no encontrado, intente con otro ID`)
        } else {
            console.log(this.products.find((producto) => producto.id == id));
        }

    }
};
const productos = new ProductManager();

//TESTING
//Primer llamada = arreglo vacio
console.log("Primer llamado Array vacio")
console.log(productos.getProduct());

//Agrego productos
console.log("Agregamos productos")
productos.addProduct("Manzana", "es una fruta, puede ser roja o verde", 500, "Imaginate una foto de una manzana", "abc123", 20);
productos.addProduct("Pera", "es una fruta, hace bien si estas mal de la panza", 400, "FotoDePera", "abc124", 30);

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

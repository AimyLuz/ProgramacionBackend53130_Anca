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
        console.log(newProduct);
        if (Object.values(newProduct).includes(undefined)) {
            console.log('Por favor, completar los campos faltantes para poder agregar el producto');
            return; // Retorno temprano si hay campos faltantes
        }

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
console.log(productos.getProduct());

//Agrego productos
productos.addProduct("Manzana", "es una fruta, puede ser roja o verde", 500, "Imaginate una foto de una manzana", "abc123", 20);
productos.addProduct("Pera", "es una fruta, hace bien si estas mal de la panza", 400, "FotoDePera", "abc124", 30);

//Validacio de codigo repetido
productos.addProduct("Gato", "es un animal", 0, "FotoDeGatito", "abc123", 1);

//Segundo llamado de productos
console.log(productos.getProduct());

//Validación de campos faltantes
productos.addProduct("MotoG82", 50000, "ImagenMotoG", "aaabbb", 30);

//buscar productos por ID
productos.getProductById(2);

//Producto no encontrado
productos.getProductById(5);

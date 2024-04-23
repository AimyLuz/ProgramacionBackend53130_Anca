import ProductsModel from "../models/products.model.js";

class ProductManager {

   
    async addProduct({title, description, price, thumbnail = [], code, stock, status, category}) {
        try {
            if(!title|| !description || !price || !code || !stock || !status || !category) {
                return { status: false, msg: "Error al agregar el producto, por favor completar los campos faltantes " };
            }
            const existeProducto = await ProductsModel.findOne({code: code});
            if(existeProducto) {
                return { status: false, msg: `Error al agregar el producto, ${code} repetido: ` };
            };

            const nuevoProducto = new ProductsModel({
                title, 
                description, 
                price,
                code,
                stock, 
                category, 
                status: true, 
                thumbnail: thumbnail || []
            });
           
            await nuevoProducto.save(); 
            return { status: true, product: nuevoProducto, msg: "Producto agregado exitosamente" };
        } catch (error) {
            return { status: false, msg: "Error al agregar el producto: " + error.message };
        }
    }

    async getProduct() {
        try {
            const productos = await ProductsModel.find();
           return productos;
        } catch (error) {
            return { status: false, msg: "Error al obtener la lista de productos: " + error.message };
        };

    }
    async getProductById(id) {
        try {
            const producto = await ProductsModel.findById(id);
            if (!producto) {
                return { status: false, msg: `Producto con ID ${id} no encontrado` };
            } else {
                return { status: true, product: producto, msg: `Producto ID: ${id} encontrado exitosamente` };
            }
        } catch (error) {
            return { status: false, msg: `Producto con ID ${id} no encontrado` + error.message };
        }
    };

    async deleteProduct(id) {
        try {
            const deleteProduct = await ProductsModel.findByIdAndDelete(id);
            if (!deleteProduct) {
                return { status: false, msg: `Producto con ID  ${id} no encontrado` };
            }
            return { status: true, delete:deleteProduct, msg: `Producto con ID ${id} eliminado correctamente` };
        } catch (error) {
            return { status: false, msg: "Error al intentar borrar el producto: " + error.message };
        }
    }
    async updateProduct(id, productoActualizado) {
        try {
            const updateProduct =  await ProductsModel.findByIdAndUpdate(id, productoActualizado, { new: true }); 
            if(!updateProduct) {
                return { status: false, msg: `Producto con ID ${id} no encontrado` };
            }
            
            return { status: true, product: updateProduct, msg: `Producto con ID ${id} actualizado correctamente` };
        } catch (error) {
            return { status: false, msg: "Error al intentar modificar el producto: " + error.message };
        }
    }
};

export default ProductManager;


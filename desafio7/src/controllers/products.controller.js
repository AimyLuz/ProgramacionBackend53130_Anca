//products.controller.js

import ProductsService from "../service/products.service.js";

const ps = new ProductsService();


class ProductsController {

//MOSTRAR PRODUCTOS
async getProducts(req, res) {
    try {
        const { page = 1, limit = 10, sort, query } = req.query; // Actualiza la obtención de los parámetros

        // Llama al ProductManager para obtener productos con los parámetros adecuados
        const productList = await ps.getProducts({ page: parseInt(page), limit: parseInt(limit), sort, query });

        if (!productList || !productList.docs || !Array.isArray(productList.docs)) {
            throw new Error("Lista de productos no es válida");
        }

        res.render("home", {
            user: req.session.user,
            products: productList.docs,
            hasPrevPage: productList.hasPrevPage,
            hasNextPage: productList.hasNextPage,
            prevPage: productList.prevPage,
            nextPage: productList.nextPage,
            currentPage: productList.page,
            totalPages: productList.totalPages,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({
            status: "error",
            error: "Error interno del servidor",
        });
    }
}

  //MOSTRAR PRODUCTO POR ID
  async getProductById (req, res) {
    try {
        const productId = req.params.pid; // Mantener como cadena de texto
        
        // Obtener producto por ID usando el ProductManager
        const product = await ps.getProductById(productId);
        
        if (product.status) { // Verificar si se encontró el producto
            return res.status(200).json({ 
                status: true, 
                product: product.product, 
                msg: "Producto encontrado exitosamente" 
            });
        } else {
            return res.status(404).json({ 
                status: false, 
                msg: "Producto no encontrado" 
            });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error.message); 
        return res.status(500).json({ 
            status: false, 
            msg: "Error interno del servidor" 
        });
    }
};

// AGREGAR PRODUCTO
async  addProduct (req, res) {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const respuesta = await ps.addProduct({
            title, description, price, thumbnail, code, stock, status, category
        });

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto agregado exitosamente
        } else {
            return res.status(400).json(respuesta); // Error al agregar el producto
        }
    } catch (error) {
        console.error("Error al agregar el producto:", error.message);
        return res.status(500).json({ status: false, msg: "Error interno del servidor" });
    }
};
// ACTUALIZAR PRODUCTO
async updateProduct (req, res) {
    try {
        const productId = req.params.pid; // Tratar el ID como cadena de texto
        const productData = req.body; // Obtener el objeto con los campos a actualizar

        const respuesta = await ps.updateProduct(productId, productData);

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto actualizado correctamente
        } else {
            return res.status(400).json(respuesta); // Producto no encontrado o error en la actualización
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        return res.status(500).json({ status: false, msg: "Error interno del servidor" });
    }
};
/*
PARA ACTUALIZAR EL PRODUCTO SE ESCRIBE CON EL SIGUIENTE FORMATO:
{
    "campo": "price",
    "valor": 2222
}
*/

// BORRAR PRODUCTO
async deleteProduct (req, res) {
    try {
        const productId = req.params.pid; // Usar ID como cadena de texto
        const respuesta = await ps.deleteProduct(productId);

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto eliminado correctamente
        } else {
            return res.status(404).json({
                status: false,
                msg: `Producto con ID ${productId} no encontrado.`
            }); // Respuesta clara para producto no encontrado
        }
    } catch (error) {
        console.error("Error al borrar el producto:", error.message);
        return res.status(500).json({
            status: false,
            msg: "Error interno del servidor: " + error.message
        });
    }
};

}

export default ProductsController;
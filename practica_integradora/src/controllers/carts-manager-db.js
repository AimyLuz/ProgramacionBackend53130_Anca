import CartsModel from "../models/carts.model.js";

class CartManager{
    async addCart() {
        try {
            const newCart = new CartsModel({products: []});
            await newCart.save();
            return {
                status: true,
                cart: newCart,
                msg: `Se agregó el carrito correctamente`
            }
        } catch (error) {
            return { status: false, msg: "Error al agregar el carrito: " + error.message };
        }
    }



    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const carts = await this.getCarts();
            const existeProducto = carts.products.find(item => item.product.toString() === productId);

            if(existeProducto) {
                existeProducto.quantity += quantity; 
            }else {
                carts.products.push({product: productId, quantity});
            }

            //Cuuando modifican tiene que marcarlo con "mar,Modified"
            //Marcamos la propiedad "products" como modificada: 
            carts.markModified("products");

            await carts.save();
            return {
                status: true,
                cart: carts,
                msg:'Producto agregado correctamente'};
            
        } catch (error) {
            return { status: false, msg: "Error al agregar el producto: " + error.message };
        }
    }

    //MOSTRAR CARRITOS
    async getCarts(){
        try{
            const carts = await CartsModel.find();
            return {
                status: true,
                cart: carts,
                msg:'Carritos'
            };
        }catch(error){
            return { status: false, msg: "Error al intentar mostrar carritos: " + error.message }
        };

    };
    async getCartById(cartId) {
        try {
            const cart = await CartsModel.findById(cartId);

            if(!cart) {
                return { status: false, msg: "No hay carritos con ese ID: " + error.message }
                return null; 
            }
            return {
                status: true,
                cart: carts,
                msg:'Carritos'
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar mostrar el carrito: " + error.message }

        }
    };
};

export default CartManager;
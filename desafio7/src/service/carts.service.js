import CartsRepository from "../repositories/carts.repository.js";

const cr = new CartsRepository();

class CartsService{

    //1.Crear carrito
    async addCart() {
        try {
            const newCart = cr.addCart({products: []});
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


//2.Borrar carrito
async deleteCart(){
    try {
        await cr.deleteCart(req.params.id);
        res.render({ message: "Carrito eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    //3.agregar productos al carrito
    async addProductToCart(cartId, productId, quantity = 1) {
        console.log(`Adding product ${productId} to cart ${cartId} with quantity ${quantity}`);
        try {
            const carts = await cr.findById(cartId);
            if (!carts) {
                console.error(`Cart with ID ${cartId} not found`);
                return { status: false, msg: `Cart not found` };
            }
            const existeProducto = carts.products.find(item => item.product.toString() === productId);
            console.log(`Product exists in cart: ${!!existeProducto}`);
            if(existeProducto) {
                existeProducto.quantity += quantity; 
            }else {
                carts.products.push({product: productId, quantity});
            }

            //Cuuando modifican tiene que marcarlo con "mar,Modified"
            //Marcamos la propiedad "products" como modificada: 
            carts.markModified("products");

            await carts.save();
            console.log("Cart saved successfully");
            return {
                status: true,
                cart: carts,
                msg:'Producto agregado correctamente'};
            
        } catch (error) {
            return { status: false, msg: "Error al agregar el producto: " + error.message };
        }
    }

 //4.mostrar carritos
    async getCarts(){
        try{
            const carts = await cr.find();
            return {
                status: true,
                cart: carts,
                msg:'Carritos'
            };
        }catch(error){
            return { status: false, msg: "Error al intentar mostrar carritos: " + error.message }
        };

    };
        //5.mostrar el carrito segun el id
    async getCartById(cartId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) { // Verificar que `cartId` sea válido
                return null;
              }

              if (!ProductsModel) {
                console.error("El modelo 'Product' no está registrado");
            }
            const cart = await cr.findById(cartId).populate('products.product'); 

            if(!cart) {
                return { status: false, msg: "No hay carritos con ese ID: " + error.message }
                
            }
            return {
                status: true,
                cart: cart,
                msg:'Carritos'
            };
        } catch (error) {
            console.error("Error en getCartById:", error);

            return { status: false, msg: "Error al intentar mostrar el carrito: " + error.message }

        }
    };


    //6.borrar un producto del carrito
    async deleteProductCart(cartId, productId){
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return {
                status: false,
                msg: "ID del carrito no es válido",
            };
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return {
                status: false,
                msg: "ID del producto no es válido",
            };
        }
        try {

            const cart = await cr.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            //cart.products = cart.products.filter(item => item.product.toString() !== productId);
            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);

            await cart.save();
            return {
                status: true,
                cart: cart,
                msg:'Producto borrado del carrito'
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar borrar producto del carrito: " + error.message }
        }
    };
    //7.agregar productos al carrito
    async updateCart(cartId, updatedProducts){
        try {
            const cart = await cr.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return {
                status: true,
                cart: cart,
                msg:'Carrito actualizado'
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar actualizar el carrito: " + error.message }
        }
    };
    //8.actualizar la cantidad de productos de un carrito

    async updateProductsQuantityCart(cartId, productId, newQuantity){
        try {
            const cart = await cr.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;


                cart.markModified('products');

                await cart.save();
                return {
                    status: true,
                    cart: cart,
                    msg:'Cantidad actualizada'
                };
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            return { status: false, msg: "Error al intentar actualizar la cantidad de productos del carrito: " + error.message }
        }
    };
    //9.vaciar carrito
    async emptyCart(cartId){
        try {
            const cart = await cr.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            );

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return {
                status: true,
                cart: cart,
                msg:'Carrito Vacio'
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar vaciar el carrito: " + error.message }
        }
    };
}


export default CartsService;
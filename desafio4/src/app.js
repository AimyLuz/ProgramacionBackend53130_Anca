import  ProductManager  from "./productmanager.js";
import express from "express";
//import multer from "multer"
import { getCurrentDirname } from './utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);
import path from "path";
import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/carts.router.js"
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";


const app = express();
const PUERTO = 8080;
const pml = new ProductManager(path.join(__dirname, "./listadoDeProductos.json"));
/* --------ESCUCHANDO ---------- */
const httpServer = app.listen(PUERTO, () => {
  console.log(`Esuchando en el puerto: ${PUERTO}`);
})

const io = new Server(httpServer);


//Middleware 
app.use(express.json())
//Voy a utilizar JSON para datos. 
app.use(express.urlencoded({extended:true}));
// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use("/api", routerProducts);
app.use("/api", routerCarts);
app.use('/', viewsRouter)
//app.use("/imagenes", express.static("public"))


/* --------Test de vida del servidor---------- */
app.get("/ping", (req, res) => {
  res.send("Pong");
});
/* --------RAIZ---------- */
app.get('/', (req, res)=>{
  res.status(200).send('<h1>Primer Pre entrega Ayelén Anca </h1>')
});
/* ------------------------------------------- */


/* --------------------SOCKET CONNECTION----------------------- */
io.on('connection', async (socket) => {
  console.log('nuevo cliente conectado');
try{
  // Emitir productos al cliente cuando se conecta
  const initialProducts = { products: await pml.getProduct() };
  console.log('Productos iniciales enviados:', initialProducts);
  socket.emit('products', initialProducts);
}catch(error){
  console.error('Error al obtener productos iniciales:', error.message);
  socket.emit('error');
}

  //Escucho evento para agregar producto 
 
  socket.on('add_product', async (producto) => {
    try {
      //Si se agrega el producto se envía evento de confirmación
      await pml.addProduct(producto)
      
      const updatedProducts = { products: await pml.getProduct() };
      console.log('Productos actualizados enviados:', updatedProducts);
     io.emit('products', updatedProducts);
     socket.emit('success')
    } catch {
      //Si hay un fallo al agregar el producto se envía evento de error 
      socket.emit('error')
    }
  })
})

/*
//---------------- MULTER --------------------------- 
const storage = multer.diskStorage({
  destination: (req,file, cb)=>{
      cb(null, "./public/img")
  },
  filename : (req, file, cb ) => {
      cb(null, file.originalname);
  }

});

const upload = multer({storage});

app.post("/upload", upload.single("imagen"), (req, res)=>{
  res.send("imagen cargada")
})
*/


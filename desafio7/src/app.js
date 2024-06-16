//app.js

import express from "express";
import exphbs from "express-handlebars";
import { Server } from 'socket.io';
import "./database.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js"
import MessageModel from "./models/mesagge.model.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import userRouter from "./routes/user.router.js";
//import sessionRouter from "./routes/session.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import UsersModel from "./models/users.model.js";
import mongoose from "mongoose";
//clase25
import configObject from "./config/config.js";
import cors from "cors"; //para unir front con back
import dotenv from 'dotenv';
// Cargar las variables de entorno
//dotenv.config({ path: './.env.produccion' });

const app = express();
//const PUERTO = 8080;
const { mongo_url, puerto } = configObject;



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cors());
//Session
app.use(session({
  store:MongoStore.create({
    mongoUrl:mongo_url,
    ttl:86400,
  }),
  secret:"secretCoder",
  resave: true, 
  saveUninitialized:true,   
}));
//Cambios passport: 
app.use(passport.initialize());
app.use(passport.session());
initializePassport(); 


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", userRouter);
app.use("/api/current", userRouter);
app.use("/", viewsRouter);

//clase25
app.get("/pruebas", async (req,res)=>{

  try{
const usuarios = await UsersModel.find();
res.send(usuarios);
  }catch (error){
    res.status(500).send("Error de servidor")
  }
})
//conectamos mongodb
mongoose.connect(mongo_url)
.then(()=> console.log("Conectados a la BD"))
.catch(()=> console.log("Error al conectar a la BD"))
//inicializamos el servidora
const httpServer = app.listen(puerto, () => {
  console.log(`Escuchando en el puerto: ${puerto}`);
});

//------------------------------------------------------

/*
const port = process.env.PUERTO || 8080;

//Listen
app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`);
})
*/
// chat en el ecommerce: 

const io = new Server(httpServer);

io.on("connection",  (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", async (data) => {

      //Guardo el mensaje en MongoDB: 
      await MessageModel.create(data);
console.log("Mensaje recibido", data)
      //Obtengo los mensajes de MongoDB y se los paso al cliente: 
      const messages = await MessageModel.find();
      console.log(messages);
      io.sockets.emit("messagesLogs", messages);
   
  })

  socket.on("add_product", async (newProduct) => {
    try {
      const ps = new ProductsService();
      const result = await ps.addProduct(newProduct);
      if (result.status) {
        io.emit('products', { products: await ps.getProducts({ limit: 100 }) });
        socket.emit('success');
      } else {
        socket.emit('error', { message: result.msg });
      }
    } catch (error) {
      socket.emit('error', { message: "Error al agregar el producto: " + error.message });
    }
  });
});


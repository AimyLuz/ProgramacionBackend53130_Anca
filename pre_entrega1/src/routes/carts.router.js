
import express from "express";
import path from "path";
import ProductManager from "../productmanager.js";
const router = express.Router();
import { getCurrentDirname } from '../utils.js'; // Importa solo la función getCurrentDirname
const __dirname = getCurrentDirname(import.meta.url);
const pml = new ProductManager(path.join(__dirname, "../listadoDeProductos.json"));






export default router;


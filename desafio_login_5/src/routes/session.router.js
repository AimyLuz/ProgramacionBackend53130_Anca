import express from "express";
import UsersModel from "../models/users.model.js";
import { isValidPassword } from "../utils/hashbcryp.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await UsersModel.findOne({ email: email });
        if (usuario) {
            //uso isValidPassword para verificar el pass: 
            
            if (isValidPassword(password, usuario)) {
                req.session.login = true;
                req.session.user = {
                    email: usuario.email,
                    first_name: usuario.first_name,
                    age: usuario.age,
                    last_name: usuario.last_name,
                    role: usuario.role
                };

                res.redirect("/products");
            } else {
                res.status(401).send({ error: "Contraseña no valida" });
            }
        } else {
            res.status(404).send({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        res.status(400).send({ error: "Error en el login" });
    }
});


//Logout: 

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})


export default router;
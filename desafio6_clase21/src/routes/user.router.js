//user.router.js

import express from "express";
import UsersModel from "../models/users.model.js";
import { createHash } from "../utils/hashbcryp.js";
import passport from "passport";

const router = express.Router();

//ruta post para generar un usuario y alacenarlo en mongo db
/*
router.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        const userExists = await UsersModel.findOne({ email: email });
        if (userExists) {
            return res.status(400).send({ error: "El correo electrónico ya está registrado" });
        }

        // Definir el rol del usuario
        const role = email === 'adminCoder@coder.com' ? 'admin' : 'usuario';

        // Crear un nuevo usuario
        const newUser = await UsersModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role
         });

        // Almacenar información del usuario
        req.session.login = true;
        req.session.user = { ...newUser._doc };

        //res.status(200).send({ message: "Usuario creado con éxito" });
        res.redirect("/login");

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});
*/

//VERSION PARA PASSPORT:
//estrategia local


router.post("/", passport.authenticate("register", {
    failureRedirect: "/failedregister"
}), async (req, res) => {
    if(!req.user) {
        return res.status(400).send("Credenciales invalidas"); 
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");

})

router.get("/failedregister", (req, res) => {
    res.send("Registro Fallido!");
})


export default router;
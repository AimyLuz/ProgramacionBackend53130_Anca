//user.router.js
import express from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";


const router = express.Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), UserController.profile);
router.post("/logout", UserController.logout);
router.get("/admin", passport.authenticate("jwt", { session: false }), UserController.admin);


export default router;
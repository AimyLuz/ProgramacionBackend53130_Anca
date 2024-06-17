//passport.config.js

import passport from "passport";
import jwt from "passport-jwt";
import UsersModel from '../models/users.model.js';
import { createHash, isValidPassword } from '../utils/hashbcryp.js';
import GitHubStrategy from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local'; // Importa LocalStrategy de passport-local
const { Strategy: JWTStrategy, ExtractJwt } = jwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Utiliza ExtractJwt.fromExtractors para extraer el token de la cookie
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            // Busca el usuario en la base de datos usando el ID del payload JWT
            const user = await UsersModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user); // Devuelve el usuario encontrado
        } catch (error) {
            return done(error);
        }
    }));
};


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}

passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            let usuario = await UsersModel.findOne({ email });

            if (!usuario) {
                return done(null, false);
            }

            if (!isValidPassword(password, usuario)) {
                return done(null, false);
            }

            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }));

passport.serializeUser((user, done) => {
        done(null, user._id);
    });

passport.deserializeUser(async (id, done) => {
        let user = await UsersModel.findById({ _id: id });
        done(null, user);
    });

passport.use('github', new GitHubStrategy({
    clientID: "Iv23liVkzNCXPxb64kEh",
    clientSecret: "11defeda49832ac1c043b0b27320612a694f751f",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let usuario = await UsersModel.findOne({ email: profile._json.email });

            if (!usuario) {
                let nuevoUsuario = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 30,
                    email: profile._json.email,
                    password: ''
                }

                let resultado = await UsersModel.create(nuevoUsuario);
                done(null, resultado);
            } else {
                done(null, usuario);
            }
        } catch (error) {
            return done(error);
        }
    }));

passport.use(new  JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'coderhouse'
    }, async (jwt_payload, done) => {
        try {
            const user = await UsersModel.findById(jwt_payload.sub);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));

export default initializePassport;
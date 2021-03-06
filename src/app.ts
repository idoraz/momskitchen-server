import express from 'express';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import dotenv from 'dotenv';
import mongo from 'connect-mongo';
import flash from 'express-flash';
import path from 'path';
import passport from 'passport';
import expressValidator from 'express-validator';
import { SESSION_SECRET } from './util/secrets';
const cors = require('cors');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';
import * as contactController from './controllers/contact';

// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

// Create Express server
const app = express();
app.use(cors());

// Express configuration
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({ 
    cookie: { maxAge: 60000 }, 
    secret: SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
}));
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: SESSION_SECRET,
//   store: new MongoStore({
//     url: mongoUrl,
//     autoReconnect: true
//   })
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);

/**
 * API routes.
 */
app.get('/api', apiController.getApi);
app.get('/getAllRecipes', apiController.getAllRecipes);
app.get('/getRecipes/:categoryKey', apiController.getRecipes);
app.get('/getObjectByKey/:collection/:key', apiController.getObjectByKey);
app.get('/searchRecipe/:token', apiController.searchRecipe);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);
app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(req.session.returnTo || '/');
    }
);

export default app;

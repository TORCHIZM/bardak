const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const ItemController = require('../app/controllers/ItemController');
const Auth = require('../app/middlewares/isAuth');

router.get('/', HomeController.homePage);
router.get('/qrcode', HomeController.qrCode);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/register', AuthController.signUpPage);
router.post('/register', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/add', Auth, ItemController.addPage);
router.post('/add', Auth, ItemController.add);
router.get('/edit', Auth, ItemController.editPage);
router.post('/edit', Auth, ItemController.edit);
router.get('/g/:id', HomeController.redirect);

module.exports = router;
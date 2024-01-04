'use strict'

var express = require("express");
var webpageController = require("../../controllers/webpage/webpageController");
var md_auth = require('../../../middleware/aunthenticated');
var api = express.Router();
//RUTAS
api.get('/getMenuUser', [md_auth.ensureAuth],webpageController.getMenuUser);
api.get('/getFavs', [md_auth.ensureAuth],webpageController.getFavs);
api.get('/getImagenesBanner', [md_auth.ensureAuth],webpageController.getImagenesBanner);
api.post('/loginEmp' ,webpageController.loginEmp);
api.get('/pruebas', [md_auth.ensureAuth],webpageController.pruebas);
api.post('/loginAD',webpageController.loginAD);

//EXPORTACION DE RUTAS
module.exports = api;
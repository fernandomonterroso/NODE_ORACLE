'use strict'

var express = require("express");
var generalController = require("../../controllers/general/generalController");
var emptys = require('../../../middleware/emptys');


var api = express.Router();
//RUTAS
api.post('/example',[emptys.validateKeys({ idUsuario: true, idTipoCliente: true })] ,generalController.listarTarea);
api.get('/listTurnoVistu' ,generalController.listTurnoVistu);
api.post('/listTurnoVistuById',generalController.getTurnoVistuById);
api.get('/testing',generalController.testing);

//EXPORTACION DE RUTAS
module.exports = api;
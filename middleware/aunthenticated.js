'user strict'

var jwt = require('jwt-simple');
var moment = require('moment');
//var Respuesta = require('../v1/models/general/respuesta.model');
const Respuesta = require('../v1/models/general/respuesta.model');
const respFormat = require("../v1/services/respFormat");
const config = require('../config');

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        let validarResp = respFormat.createResp({ status_code: 51 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, config.SECRET);

        if (payload.exp <= moment().unix()) {
            let validarResp = respFormat.createResp({ status_code: 33 });
            return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
        }
    } catch (error) {
        let validarResp = respFormat.createResp({ status_code: 41 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
    }
    
    req.user = payload;
    req.user.acceso = true;
    next();

}
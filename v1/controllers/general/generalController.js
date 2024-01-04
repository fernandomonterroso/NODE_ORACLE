'use strict'
const conexion = require('../../../conexiones/oracledbCombex');
var Respuesta = require('../../models/general/respuesta.model');
var respFormat = require("../../services/respFormat");

function listarTarea(req, res, next) {
    try {
        var Tarea = require('../../models/example.model');
        var tarea = new Tarea(req.body);
        return res.status(200).send(tarea);
    } catch (error) {
        return next(error);
    }
}

function listTurnoVistu(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_vistu_turno.sql', options: { autoCommit: true, timeout: 2000 } }).then(function (result) {
        return res.status(200).send({ data: result.rows });
    }).catch(function (err) {
        return next(err);
    });
}

function getTurnoVistuById(req, res, next) {
    const parametros = {
        ruta: 'v1/src/querys/general/sel_vistu_turno_by_id.sql',
        bindParams: req.body,
        options: { autoCommit: true }
    };

    conexion.queryObject(parametros)
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        }).catch(function (err) {
            return next(err);
        });
}

async function testing(req, res, next) {
    try {
        var tiempoEspera=0;
        if(req.query.tiempo!=undefined){
        tiempoEspera = Math.floor(Math.random() * (6000 - 1000 + 1)) + 1000;
        await new Promise(resolve => setTimeout(resolve, tiempoEspera));
        }
        let validarResp = respFormat.createResp({ status_code: 1,data: {tiempoEspera:tiempoEspera/1000} });
        let respuesta = new Respuesta(validarResp);
        
        return res.status(validarResp.estado_http).send(respuesta);
      } catch (error) {
        return next(error);
      }
}

module.exports = {
    listarTarea,
    listTurnoVistu,
    getTurnoVistuById,
    testing,
}
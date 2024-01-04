'use strict'

const conexion = require('../../../conexiones/oracledbCombex');
var Respuesta = require('../../models/general/respuesta.model');
var jwt = require("../../services/jwt");
var respFormat = require("../../services/respFormat");

async function getMenuUser(req, res, next) {
    try {
        const result = await conexion.queryObject({ 
            ruta: 'v1/src/querys/webpage/sel_menu.sql', 
            bindParams: { userbd: req.user.login.userbd }, 
            credentials: req.user.login 
        });
        res.locals.respuesta = respFormat.createResp({ status_code: 1, data: result.rows });
        next();
    } catch (error) {
        next(error);
    }
}



function getFavs(req, res, next) {
    try {
        conexion.queryObject({ ruta: "v1/src/querys/webpage/sel_favs.sql", bindParams: { userbd: req.user.login.userbd }, credentials: req.user.login })
            .then(function (result) {
                res.locals.respuesta =  respFormat.createResp({ status_code: 1, data: result.rows });;
                next();
            })
            .catch(function (err) {
                return next(err);
            });
    } catch (error) {
        return next(error);
    }
}


async function getEnpointsPublic(req, res, next) {
    try {
        const result = await conexion.queryObject({
            ruta: 'v1/src/querys/webpage/sel_imgs_banner_app.sql', 
            credentials: req.user.login 
        });

        res.locals.respuesta = respFormat.createResp({ status_code: 1, data: result.rows });

        next();

    } catch (error) {
        next(error);
    }
}

async function getImagenesBanner(req, res, next) {
    try {
        const result = await conexion.queryObject({
            ruta: 'v1/src/querys/webpage/sel_imgs_banner_app.sql', 
            credentials: req.user.login
        });

        res.locals.respuesta = respFormat.createResp({ status_code: 1, data: result.rows });
        next();

    } catch (error) {
        next(error);
    }
}

function loginAD(req, res, next) {
    try {

        const ActiveDirectory = require('activedirectory2');
        var Login = require('../../models/webpage/user.model');
        let loginModel = new Login(req.body);

        const config = {
            url: 'ldap://192.200.9.223',
            baseDN: 'dc=combex,dc=local',
            username: 'fmonterroso@combexim.com.gt',
            password: "Elmerfer_mejor"
        };
        let validarResp;


        const ad = new ActiveDirectory(config);
        console.log(loginModel);
        ad.authenticate(loginModel.userbd, loginModel.password, (err, auth) => {
            if (err) {
                let validarResp = respFormat.createResp({ status_code: 36, data: err });
                return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
            } else if (!auth) {
                //reject(new Error('Invalid username or password'));
                let validarResp = respFormat.createResp({ status_code: 37, data: err });
                return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
            } else {
                ad.findUser(loginModel.userbd, (err, user) => {
                    if (err) {
                        //reject(err);
                        let validarResp = respFormat.createResp({ status_code: 38, data: err });
                        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
                    } else {
                        let validarResp = respFormat.createResp({ status_code: 1, data: user });
                        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));

                    }
                });
            }
        });
    } catch (error) {
        return next(error);
    }
}

async function loginEmp(req, res, next) {
    try {
        var Login = require('../../models/webpage/user.model');
        let loginModel = new Login(req.body);
        let result = await conexion.comprobateUser(loginModel);
        let validarResp;
        if (result === true) {
            conexion.queryObject({ ruta: 'v1/src/querys/general/sel_info_token.sql', bindParams: { userbd: loginModel.userbd, empresa: loginModel.empresa }, credentials: loginModel })
                .then(function (result) {
                    if (result.rows == 0) {

                        validarResp = respFormat.createResp({ status_code: 37 });
                        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
                    } else {
                        let validarResp = respFormat.createResp({ status_code: 1, data: { userData: result.rows[0], accessToken: jwt.createTokenEmp({ ...result.rows[0], ...loginModel }) } });
                        res.locals.respuesta = new Respuesta(validarResp);
                        res.locals.estado_http = validarResp.estado_http;
                    };
                    next();
                    //return res.status(200).send(respuesta);
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            if (!req.user) {
                req.user = {};
            }
            if (!req.user.login) {
                req.user.login = {};
            }

            req.user.login.userbd = loginModel.userbd;
            validarResp = respFormat.createResp({ status_code: 50 });
            res.locals.respuesta = new Respuesta(validarResp);
            res.locals.estado_http = validarResp.estado_http;
            console.log("res.locals.estado_http",res.locals.estado_http);
            next();
        };

    } catch (error) {
        return next(error);
    }
}


async function pruebas(req, res, next) {
    let pool = await conexion.getPool(req.user.login);
    const conn = await pool.getConnection();
    try {

        for (let index = 5; index < 8; index++) {
            console.log(index);
            await conexion.queryObject({
                query: `INSERT INTO sab.sab_it_uri (
                uri_id,
                uri_valor,
                uri_grupo,
                uri_coments
            ) VALUES (
                :uri_id,
                '',
                '',
                ''
            )`, bindParams: { uri_id: index }, options: { autoCommit: undefined }, poolSession: conn
            });
        }

        await conn.commit();
        await conn.close();
        await pool.close();
        let validarResp = respFormat.createResp({ status_code: 1 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));

    } catch (error) {
        await conn.rollback();
        await conn.close();
        await pool.close();
        return next(error);
    };

}

module.exports = {
    getMenuUser,
    loginEmp,
    pruebas,
    getImagenesBanner,
    getFavs,
    loginAD,
    getEnpointsPublic,
}

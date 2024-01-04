'use strict'

const conexion = require('../conexiones/oracledbCombex');
const config = require('../config');

function logPeticiones(req, res, next) {
    
    try {
        
        if (!req.res.locals.respuesta) {
            return next();
        }

        const time = Date.now() - req._startTime;
        const logData = {
          endpoint: req.originalUrl,
          userSystem: req.user?.login?.userbd,
          userBD: req.user?.acceso ? req.user?.login?.userbd : config.USERBD || "",
          success: res.locals.respuesta.estado_http >= 200 && res.locals.respuesta.estado_http < 300 ? 'S' : 'N',
          httpStatus: res.locals.estado_http,
          method: req.method,
          ip: req.ip,
          sysId: 1,
          time:time,
          responseSize: roughSizeOfObject(res.locals.respuesta) || 0, 
          requestSize: req.headers['content-length'] || 0,
          status_code : req.res.locals.respuesta.status_code || "",
        };
        
        const bindParams = {
            endpoint: logData.endpoint,
            userSystem: logData.userSystem,
            userBD: logData.userBD,
            success: logData.success,
            httpStatus: logData.httpStatus,
            method: logData.method,
            ip: logData.ip,
            sysId: logData.sysId,
            time: logData.time,
            responseSize: logData.responseSize, 
            requestSize: logData.requestSize,
            status_code: logData.status_code,
          };
        conexion.queryObject({ ruta: 'v1/src/querys/general/ins_log_api.sql', bindParams: bindParams, credentials: {userbd: config.USERBD,password: config.PASSBD}})
            .then(function (result) {
                
            })
            .catch(function (err) {
                console.log("error en log",err);
            });
    } catch (error) {
        return next(error);
    }
    res.status(res.locals.respuesta.estado_http).send(res.locals.respuesta);
}

function roughSizeOfObject( object ) {
  var objectList = [];
  var stack = [ object ];
  var bytes = 0;

  while ( stack.length ) {
      var value = stack.pop();

      if ( typeof value === 'boolean' ) {
          bytes += 4;
      }
      else if ( typeof value === 'string' ) {
          bytes += value.length * 2;
      }
      else if ( typeof value === 'number' ) {
          bytes += 8;
      }
      else if
      (
          typeof value === 'object'
          && objectList.indexOf( value ) === -1
      )
      {
          objectList.push( value );

          for( var i in value ) {
              stack.push( value[ i ] );
          }
      }
  }
  return bytes;
}

module.exports = {
    logPeticiones,
}

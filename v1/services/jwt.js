'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const config = require('../../config');

exports.createTokenEmp = function (user) {
    var payload = {
        empleado: {
            codemp: user.CODEMP,
        },
        login: {
            userbd: user.userbd,
            password: user.password
        },
        iat: moment().unix(),
        //exp: moment().add(2, 'minutes').unix()
        //exp: moment().add(2, 'minute').unix(),
        exp: moment().day(30, 'days').unix(),
        "id": 1,
    };

    return jwt.encode(payload, config.SECRET,)
}
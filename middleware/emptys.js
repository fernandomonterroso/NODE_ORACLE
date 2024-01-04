const validateKeys = (keysObj) => (req, res, next) => {
    const keysArray = Object.keys(keysObj);
    const errors = [];
    let errores = { required: "" };
    keysArray.forEach((key) => {

        if (keysObj[key] && (!req.body[key] || req.body[key].trim() === '')) {

            errores.required = errores.required + `El parametro ${key} es obligatorio. `;
        }
    });
    console.log(errores.required);
    if (errores.required != "") {
        const Respuesta = require("../v1/models/general/respuesta.model");
        const respFormat = require("../v1/services/respFormat");
        let validarResp = respFormat.createResp({ status_code: 47,message: errores.required });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
    }

    next();
};

module.exports = {
    validateKeys,
};

const { param, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json(errors);

    next();
}

const idByParamValidation = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

module.exports = { validateRequest, idByParamValidation };
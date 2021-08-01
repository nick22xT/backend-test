const moment = require('moment');
const { query, body, param, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json(errors);

    next();
}

const validateSearchFechas = [
    query('eventoId', 'El valor de eventoId no es valido').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    query('fromDate', 'El valor de fromDate no es valido').optional({ nullable: true, checkFalsy: true }).isISO8601(),
    query('toDate', 'El valor de toDate no es valido').optional({ nullable: true, checkFalsy: true }).isISO8601(),
    validateRequest
];

const validateGetEventoFecha = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

const validatePostEventoFecha = [];

const validatePutEventoFecha = [];

const validateDeleteEventoFecha = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

module.exports = { validateSearchFechas, validateGetEventoFecha, validatePostEventoFecha, validatePutEventoFecha, validateDeleteEventoFecha };
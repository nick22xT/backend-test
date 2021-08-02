const moment = require('moment');
const { query, body, param, validationResult } = require("express-validator");

const checkDateRange = (inicio, { req }) => {
    const inicioDate = moment(inicio, 'YYYY-MM-DDTHH:mm:ssZ', true);
    const finDate = moment(req.body.fin, 'YYYY-MM-DDTHH:mm:ssZ', true);

    if (inicioDate.isBefore(moment()))
        throw new Error("La fecha de inicio no puede ser mayor a la fecha actual.");
    if (inicioDate.isAfter(finDate))
        throw new Error("La fecha de inicio no puede ser mayor a la fecha de fin.");

    return true;
}

const checkMatchIdEventoFechaId = (id, { req }) => {
    if (id != req.body.eventoFechaId)
        throw new Error("El ID enviado por parametro no coincide con el ID enviado en la entidad EventoFecha.");

    return true;
}

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

const validatePostEventoFecha = [
    body('eventoId', 'El eventoId no esta definido o no es valido').exists().isNumeric().notEmpty(),
    body('inicio', 'La fecha de inicio no esta definida o no es valida').exists().isISO8601().notEmpty(),
    body('fin', 'La fecha de fin no esta definida o no es valida').exists().isISO8601().notEmpty(),
    body('inicio').custom(checkDateRange),
    body('precio', 'El valor de precio no es valido').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    validateRequest
];

const validatePutEventoFecha = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    body('eventoFechaId', 'El id de la fecha no esta definido o no es valido.').exists().isNumeric(),
    param('id').custom(checkMatchIdEventoFechaId),
    body('eventoId', 'El eventoId no esta definido o no es valido').exists().isNumeric().notEmpty(),
    body('inicio', 'La fecha de inicio no esta definida o no es valida').exists().isISO8601().notEmpty(),
    body('fin', 'La fecha de fin no esta definida o no es valida').exists().isISO8601().notEmpty(),
    body('inicio').custom(checkDateRange),
    body('precio', 'El valor de precio no es valido').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    validateRequest
];

const validateDeleteEventoFecha = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

module.exports = { validateSearchFechas, validateGetEventoFecha, validatePostEventoFecha, validatePutEventoFecha, validateDeleteEventoFecha };
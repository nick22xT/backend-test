const moment = require('moment');
const { query, validationResult, body, param } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json(errors);

    next();
}

const checkEventosFechas = (fechas = []) => {
    fechas.forEach(fecha => {
        const inicio = moment(fecha.inicio, 'YYYY-MM-DDTHH:mm:ssZ', true);
        const fin = moment(fecha.fin, 'YYYY-MM-DDTHH:mm:ssZ', true);

        if (!inicio.isValid())
            throw new Error("La fecha de inicio no es valida.");
        if (!fin.isValid())
            throw new Error("La fecha de fin no es valida.");
        if (inicio.isBefore(moment()))
            throw new Error("La fecha de inicio no puede ser mayor a la fecha actual.");
        if (inicio.isAfter(fin))
            throw new Error("La fecha de inicio no puede ser mayor a la fecha de fin.");
    });

    return true;
}

const checkMatchIdEventoId = (id, { req }) => {
    if (id != req.body.eventoId)
        throw new Error("El ID enviado por parametro no coincide con el ID enviado en la entidad Evento.");

    return true;
}

const validateSearchEvents = [
    query('destacados').optional({ nullable: true, checkFalsy: true }).isBoolean(),
    validateRequest
];

const validateGetEvent = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

const valitatePostEvent = [
    body('titulo', 'El titulo del evento es requerido.').exists().isString().notEmpty(),
    body('descripcion', 'La descripción del evento es requerida.').exists().isString().notEmpty(),
    body('lugar', 'El lugar del evento es requerido.').exists().isString().notEmpty(),
    body('destacado', 'El campo destacado del evento no esta definido o no es valido.').exists().isBoolean(),
    body('eventosFechas', 'Las fechas del evento son requeridas').exists().notEmpty(),
    body('eventosFechas', 'Las fechas del eventos son invalidas').isArray(),
    body('eventosFechas').custom(checkEventosFechas),
    validateRequest
];

const validatePutEvent = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    body('eventoId', 'El id del evento no esta definido o no es valido.').exists().isNumeric(),
    param('id').custom(checkMatchIdEventoId),
    body('titulo', 'El titulo del evento es requerido.').exists().isString().notEmpty(),
    body('descripcion', 'La descripción del evento es requerida.').exists().isString().notEmpty(),
    body('lugar', 'El lugar del evento es requerido.').exists().isString().notEmpty(),
    body('destacado', 'El campo destacado del evento no esta definido o no es valido.').exists().isBoolean(),
    validateRequest
];

const validateDeleteEvent = [
    param('id', 'El parametro id de la url no esta definido o no es valido.').exists().isNumeric(),
    validateRequest
];

module.exports = { validateSearchEvents, validateGetEvent, valitatePostEvent, validatePutEvent, validateDeleteEvent };
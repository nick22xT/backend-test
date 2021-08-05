const { body } = require("express-validator");
const { validateRequest } = require('./shared.middleware');

const validateLoginReq = [
    body('username', 'El nombre de usuario es requerido.').exists().notEmpty(),
    body('username', 'El nombre de usuario no es valido.').isString().isLength({ min: 3 }),
    body('password', 'El password es requerido.').exists().notEmpty(),
    body('password', 'El password no es valido.').isString().isLength({ min: 7 }),
    validateRequest
];

module.exports = { validateLoginReq };
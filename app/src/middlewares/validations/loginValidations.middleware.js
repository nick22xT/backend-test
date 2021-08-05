const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json(errors);

    next();
}

const validateLoginReq = [
    body('username', 'El nombre de usuario es requerido.').exists().notEmpty(),
    body('username', 'El nombre de usuario no es valido.').isString().isLength({ min: 3 }),
    body('password', 'El password es requerido.').exists().notEmpty(),
    body('password', 'El password no es valido.').isString().isLength({ min: 7 }),
    validateRequest
];

module.exports = { validateLoginReq };
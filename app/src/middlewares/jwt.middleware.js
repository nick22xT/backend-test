const jwt = require('jsonwebtoken');
const { User } = require('../models/Models');
require('dotenv').config({ path: '.env' });

const authenticate = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            if (isSearchEventos(req.method, req.baseUrl)) {
                req.query.pageSize = 4;
                req.query.pageIndex = 1;
                return next();
            } else {
                return res.status(401).json("Acceso denegado.");
            }
        }

        token = token.substring(token.indexOf(" ") + 1, token.length);

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decode.userId ? decode.userId : 0);

        if (!user) {
            if (isSearchEventos(req.method, req.baseUrl)) {
                req.query.pageSize = 4;
                req.query.pageIndex = 1;
                return next();
            } else {
                return res.status(401).json("Acceso denegado.");
            }
        }

        req.jwtUser = { userId: user.userId, username: user.username };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            if (isSearchEventos(req.method, req.baseUrl)) {
                req.query.pageSize = 4;
                req.query.pageIndex = 1;
                return next();
            } else {
                return res.status(401).json("Acceso denegado.");
            }
        } else {
            console.error(error);
            return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
        }
    }
}

const isSearchEventos = (method, baseUrl) => method === 'GET' && baseUrl === '/eventos';

module.exports = { authenticate };
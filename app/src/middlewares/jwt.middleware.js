const jwt = require('jsonwebtoken');
const { User } = require('../models/Models');
require('dotenv').config({ path: '.env' });

const authenticate = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token)
            return res.status(401).json("Acceso denedago.");

        token = token.substring(token.indexOf(" ") + 1, token.length);

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decode.userId);

        if (!user)
            return res.status(401).json("Acceso denedago.");

        req.jwtUser = { userId: user.userId, username: user.username };

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

const authenticateSearchEvent = async (req, res, next) => {
    next();
}

module.exports = { authenticate, authenticateSearchEvent };
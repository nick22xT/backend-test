const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Models');
require('dotenv').config({ path: '.env' });

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user)
            return res.status(400).json("El usuario o la contraseña son invalidos.");

        const validatePass = bcrypt.compareSync(password, user.password);

        if (!validatePass)
            return res.status(400).json("El usuario o la contraseña son invalidos.");

        const token = jwt.sign(
            { userId: user.userId, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: 86400 }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Ocurrió un error inesperado. Intente nuevamente mas tarde.');
    }
}

module.exports = { login };
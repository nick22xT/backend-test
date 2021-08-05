const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { validateLoginReq } = require('../middlewares/validations/loginValidations.middleware');

router.post('/login', validateLoginReq, controller.login);

module.exports = router;
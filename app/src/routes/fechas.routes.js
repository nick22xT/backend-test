const express = require('express');
const router = express.Router();
const controller = require('../controllers/fechas.controller');
const { validateSearchFechas, validatePostEventoFecha, validatePutEventoFecha } = require('../middlewares/validations/fechasValidations.middleware');
const { idByParamValidation } = require('../middlewares/validations/shared.middleware');
const { authenticate } = require('../middlewares/jwt.middleware');

router.get('/', authenticate, validateSearchFechas, controller.searchEventosFechas);
router.get('/:id', authenticate, idByParamValidation, controller.getEventoFechaById);
router.post('/', authenticate, validatePostEventoFecha, controller.addEventoFecha);
router.put('/:id', authenticate, validatePutEventoFecha, controller.updateEventoFecha);
router.delete('/:id', authenticate, idByParamValidation, controller.deleteEventoFecha);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventosFechas.controller');
const validations = require('../middlewares/validations/eventosFechasValidations.middleware');
const { authenticate } = require('../middlewares/jwt.middleware');

router.get('/', authenticate, validations.validateSearchFechas, controller.searchEventosFechas);
router.get('/:id', authenticate, validations.validateGetEventoFecha, controller.getEventoFechaById);
router.post('/', authenticate, validations.validatePostEventoFecha, controller.addEventoFecha);
router.put('/:id', authenticate, validations.validatePutEventoFecha, controller.updateEventoFecha);
router.delete('/:id', authenticate, validations.validateDeleteEventoFecha, controller.deleteEventoFecha);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventosFechas.controller');
const validations = require('../middlewares/validateFechasRequest');

router.get('/', validations.validateSearchFechas, controller.searchEventosFechas);
router.get('/:id', validations.validateGetEventoFecha, controller.getEventoFechaById);
router.post('/', validations.validatePostEventoFecha, controller.addEventoFecha);
router.put('/:id', validations.validatePutEventoFecha, controller.updateEventoFecha);
router.delete('/:id', validations.validateDeleteEventoFecha, controller.deleteEventoFecha);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventos.controller');
const validations = require('../middlewares/validateEventosRequests');

router.get('/', validations.validateSearchEvents, controller.getEventos);
router.get('/:id', validations.validateGetEvent, controller.getEventoById);
router.post('/', validations.valitatePostEvent, controller.addEvento);
router.put('/:id', validations.validatePutEvent, controller.updateEvento);
router.delete('/:id', validations.validateDeleteEvent, controller.deleteEvento);

module.exports = router;
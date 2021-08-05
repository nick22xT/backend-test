const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventos.controller');
const validations = require('../middlewares/validations/eventosValidations.middleware');
const { authenticate } = require('../middlewares/jwt.middleware');

router.get('/', authenticate, validations.validateSearchEvents, controller.getEventos);
router.get('/:id', validations.validateGetEvent, controller.getEventoById);
router.post('/', authenticate, validations.valitatePostEvent, controller.addEvento);
router.put('/:id', authenticate, validations.validatePutEvent, controller.updateEvento);
router.delete('/:id', authenticate, validations.validateDeleteEvent, controller.deleteEvento);
router.get('/:id/publicar', authenticate, controller.publicarEvento);

module.exports = router;
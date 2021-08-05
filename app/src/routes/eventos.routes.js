const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventos.controller');
const { validateSearchEvents, valitatePostEvent, validatePutEvent } = require('../middlewares/validations/eventosValidations.middleware');
const { idByParamValidation } = require('../middlewares/validations/shared.middleware');
const { authenticate } = require('../middlewares/jwt.middleware');

router.get('/', authenticate, validateSearchEvents, controller.getEventos);
router.get('/:id', idByParamValidation, controller.getEventoById);
router.post('/', authenticate, valitatePostEvent, controller.addEvento);
router.put('/:id', authenticate, validatePutEvent, controller.updateEvento);
router.delete('/:id', authenticate, idByParamValidation, controller.deleteEvento);
router.get('/:id/publicar', authenticate, controller.publicarEvento);

module.exports = router;
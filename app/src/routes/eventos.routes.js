const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventos.controller');

router.get('/', controller.getEventos);
router.get('/:id', controller.getEventoById);
router.post('/', controller.addEvento);
router.put('/', controller.updateEvento);
router.delete('/:id', controller.deleteEvento);

module.exports = router;
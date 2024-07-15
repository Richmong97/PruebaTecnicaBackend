const express = require('express');
const router = express.Router();
const colaboradorController = require('../Controller/apiColaboradorController');

router.get('/colaboradores', colaboradorController.getAllColaboradores);
router.post('/colaboradores', colaboradorController.createColaborador);
router.put('/colaboradores/:id', colaboradorController.updateColaborador);
router.delete('/colaboradores/:id', colaboradorController.deleteColaborador);
router.get('/colaboradores/identidad/:identidad', colaboradorController.getColaboradorByIdentidad);
router.get('/colaboradores/count', colaboradorController.getColaboradoresCount);

module.exports = router;

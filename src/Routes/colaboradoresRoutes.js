const express = require('express');
const router = express.Router();
const colaboradorController = require('../Controller/apiColaboradorController'); // Ajusta la ruta según tu estructura de proyecto

router.get('/colaboradores', colaboradorController.getAllColaboradores);
router.post('/colaboradores', colaboradorController.createColaborador);
router.put('/colaboradores/:id', colaboradorController.updateColaborador);

module.exports = router;

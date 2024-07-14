// Ejemplo de cómo debería verse el archivo `colaboradoresRoutes.js`

const express = require('express');
const router = express.Router();
const colaboradorController = require('../Controller/apiColaboradorController');

router.get('/colaboradores', colaboradorController.getAllColaboradores);
router.post('/colaboradores', colaboradorController.createColaborador);
router.put('/colaboradores/:id', colaboradorController.updateColaborador);
router.delete('/colaboradores/:id', colaboradorController.deleteColaborador);

module.exports = router;

const express = require('express');
const router = express.Router();
const apiColaboradorController = require('../Controller/apiColaboradorController');
const apiAuthController = require('../Controller/apiAuthController');

// Endpoint para obtener todos los colaboradores
router.get('/colaboradores', colaboradoresController.getColaboradores);

// Endpoint para crear un nuevo colaborador
router.post('/colaboradores', colaboradoresController.createColaborador);

// Endpoint para actualizar un colaborador por su ID
router.put('/colaboradores/:id', colaboradoresController.updateColaborador);

// Endpoint para dar de baja a un colaborador por su ID
router.put('/colaboradores/:id/dardebaja', colaboradoresController.darDeBajaColaborador);

// Endpoint para iniciar sesión
router.post('/login', authController.login);

module.exports = router;

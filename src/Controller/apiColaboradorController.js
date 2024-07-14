const express = require('express');
const router = express.Router();
const Colaborador = require('../models/Colaborador');
const { ApiResponse } = require('../api/apiResponse');
const { ApiError } = require('../api/apiError');

// Obtener todos los colaboradores
router.get('/colaboradores', async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll();
    res.status(200).json(new ApiResponse({
      statusCode: 200,
      message: 'Colaboradores encontrados',
      success: true,
      data: colaboradores, // Asegúrate de que `colaboradores` contenga los datos correctamente
      title: 'Éxito'
    }));
  } catch (error) {
    console.error('Error al buscar colaboradores:', error);
    res.status(error.statusCode || 500).json(new ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al buscar colaboradores',
      success: false,
      title: 'Error'
    }));
  }
});

// Crear un nuevo colaborador
router.post('/colaboradores', async (req, res) => {
  const { identidad, cargo, nombre, apellido, telefono, correo, password } = req.body;

  try {
    const newColaborador = await Colaborador.create({
      identidad,
      cargo,
      nombre,
      apellido,
      telefono,
      correo,
      password
    });

    res.status(201).json(new ApiResponse({
      statusCode: 201,
      message: 'Colaborador creado',
      success: true,
      data: newColaborador,
      title: 'Éxito'
    }));
  } catch (error) {
    console.error('Error al crear colaborador:', error);
    res.status(error.statusCode || 500).json(new ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al crear colaborador',
      success: false,
      title: 'Error'
    }));
  }
});

// Actualizar un colaborador
router.put('/colaboradores/:id', async (req, res) => {
  const { id } = req.params;
  const { identidad, cargo, nombre, apellido, telefono, correo } = req.body;

  try {
    const colaborador = await Colaborador.findByPk(id);

    if (!colaborador) {
      throw new ApiError(404, 'Colaborador no encontrado', 'Error');
    }

    colaborador.identidad = identidad;
    colaborador.cargo = cargo;
    colaborador.nombre = nombre;
    colaborador.apellido = apellido;
    colaborador.telefono = telefono;
    colaborador.correo = correo;

    await colaborador.save();

    res.status(200).json(new ApiResponse({
      statusCode: 200,
      message: 'Colaborador actualizado',
      success: true,
      data: colaborador,
      title: 'Éxito'
    }));
  } catch (error) {
    console.error(`Error al actualizar colaborador ${id}:`, error);
    res.status(error.statusCode || 500).json(new ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al actualizar colaborador',
      success: false,
      title: 'Error'
    }));
  }
});

module.exports = router;

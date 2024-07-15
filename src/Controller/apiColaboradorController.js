const express = require('express');
const router = express.Router();
const Colaborador = require('../models/Colaborador');
const { ApiResponse } = require('../api/apiResponse');
const { ApiError } = require('../api/apiError');
const { createColaboradorSchema, updateColaboradorSchema } = require('../Schemas/ValidationSchemas');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(new ApiResponse(400, error.details.map(e => e.message).join(', '), false, null, 'Error de validación'));
  }
  next();
};

// Obtener todos los colaboradores
router.get('/colaboradores', async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll({
      where: { deleted_at: null } // Solo colaboradores activos
    });

    // Mapear los colaboradores a un arreglo sin envolverlos en un objeto adicional
    const colaboradoresData = colaboradores.map(colaborador => ({
      id: colaborador.id,
      identidad: colaborador.identidad,
      cargo: colaborador.cargo,
      nombre: colaborador.nombre,
      apellido: colaborador.apellido,
      telefono: colaborador.telefono,
      correo: colaborador.correo
      // Añadir otras propiedades necesarias si las hay
    }));

    res.status(200).json(colaboradoresData);
  } catch (error) {
    console.error('Error al buscar colaboradores:', error);
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || 'Error al buscar colaboradores',
      success: false,
      title: 'Error'
    });
  }
});

// Contar colaboradores activos
const countActiveColaboradores = async () => {
  try {
    const count = await Colaborador.count({
      where: { deleted_at: null } // Solo contar colaboradores activos
    });
    return count;
  } catch (error) {
    console.error('Error al contar colaboradores activos:', error);
    throw new ApiError('Error al contar colaboradores activos', 500);
  }
};

// GET: Buscar colaborador por número de identidad
router.get('/colaboradores/identidad/:identidad', async (req, res) => {
  const { identidad } = req.params;

  try {
    const colaborador = await Colaborador.findOne({
      where: { identidad },
      attributes: ['identidad', 'cargo', 'nombre', 'apellido', 'telefono', 'correo']
    });

    if (!colaborador) {
      return res.status(404).json({
        status: 404,
        message: 'Colaborador no encontrado',
        success: false,
        data: null
      });
    }

    const { identidad: id, cargo, nombre, apellido, telefono, correo } = colaborador;

    res.status(200).json({
      status: 200,
      message: 'Colaborador encontrado',
      success: true,
      data: {
        identidad: id,
        cargo,
        nombre,
        apellido,
        telefono,
        correo
      }
    });
  } catch (error) {
    console.error('Error al buscar colaborador por identidad:', error);
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || 'Error al buscar colaborador por identidad',
      success: false,
      data: null
    });
  }
});

// Crear un nuevo colaborador
router.post('/colaboradores', validateBody(createColaboradorSchema), async (req, res) => {
  const { identidad, cargo, nombre, apellido, telefono, correo, password } = req.body;

  try {
    const newColaborador = await Colaborador.create({
      identidad,
      cargo,
      nombre,
      apellido,
      telefono,
      correo,
      password,
    });

    res.status(201).json(new ApiResponse(201, 'Colaborador creado', true, newColaborador, 'Éxito'));
  } catch (error) {
    console.error('Error al crear colaborador:', error);
    res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || 'Error al crear colaborador', false, null, 'Error'));
  }
});

// Actualizar un colaborador
router.put('/colaboradores/:id', validateBody(updateColaboradorSchema), async (req, res) => {
  const { id } = req.params;
  const { identidad, cargo, nombre, apellido, telefono, correo, password, newPassword } = req.body;

  try {
    const colaborador = await Colaborador.findByPk(id);

    if (!colaborador) {
      return res.status(404).json(new ApiResponse(404, 'Colaborador no encontrado', false, null, 'Error'));
    }

    if (password && newPassword) {
      colaborador.password = newPassword;
    }

    colaborador.identidad = identidad || colaborador.identidad;
    colaborador.cargo = cargo || colaborador.cargo;
    colaborador.nombre = nombre || colaborador.nombre;
    colaborador.apellido = apellido || colaborador.apellido;
    colaborador.telefono = telefono || colaborador.telefono;
    colaborador.correo = correo || colaborador.correo;

    await colaborador.save();

    res.status(200).json(new ApiResponse(200, 'Colaborador actualizado', true, colaborador, 'Éxito'));
  } catch (error) {
    console.error(`Error al actualizar colaborador ${id}:`, error);
    res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || 'Error al actualizar colaborador', false, null, 'Error'));
  }
});

// Eliminar un colaborador
router.delete('/colaboradores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Intentando eliminar colaborador con ID: ${id}`);
    const colaborador = await Colaborador.findByPk(id);

    if (!colaborador) {
      console.log(`Colaborador con ID ${id} no encontrado`);
      return res.status(404).json(new ApiResponse(404, 'Colaborador no encontrado', false, null, 'Error'));
    }

    await colaborador.destroy();

    console.log(`Colaborador con ID ${id} eliminado correctamente`);
    res.status(200).json(new ApiResponse(200, 'Colaborador eliminado', true, null, 'Éxito'));
  } catch (error) {
    console.error(`Error al eliminar colaborador ${id}:`, error);
    res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || 'Error al eliminar colaborador', false, null, 'Error'));
  }
});

// Obtener conteo de colaboradores activos
router.get('/colaboradores/count', async (req, res) => {
  try {
    const count = await countActiveColaboradores();

    res.status(200).json({
      status: 200,
      message: 'Conteo de colaboradores activos obtenido',
      success: true,
      data: {
        colaboradoresCount: count,
      },
    });
  } catch (error) {
    console.error('Error al obtener el conteo de colaboradores activos:', error);
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || 'Error al obtener el conteo de colaboradores activos',
      success: false,
      data: null,
    });
  }
});

module.exports = router;

const Joi = require('joi');

const createColaboradorSchema = Joi.object({
    identidad: Joi.string().required().messages({
      'any.required': 'La identidad es un campo obligatorio',
    }),
    cargo: Joi.string().required().messages({
      'any.required': 'El cargo es un campo obligatorio',
    }),
    nombre: Joi.string().required().messages({
      'any.required': 'El nombre es un campo obligatorio',
    }),
    apellido: Joi.string().required().messages({
      'any.required': 'El apellido es un campo obligatorio',
    }),
    telefono: Joi.string().optional().allow(''),
    correo: Joi.string().email().required().messages({
      'any.required': 'El correo es un campo obligatorio',
      'string.email': 'Debe ser un correo electrónico válido',
    }),
    password: Joi.string().required().messages({
      'any.required': 'La contraseña es un campo obligatorio',
    }),
    newPassword: Joi.string().optional().allow(''),
    confirmPassword: Joi.string().optional().valid(Joi.ref('newPassword')).messages({
      'any.only': 'La confirmación de la contraseña no coincide con la nueva contraseña',
    }),
  });
  

const updateColaboradorSchema = Joi.object({
  identidad: Joi.string().optional(),
  cargo: Joi.string().optional(),
  nombre: Joi.string().optional(),
  apellido: Joi.string().optional(),
  telefono: Joi.string().optional().allow(''),
  correo: Joi.string().email().optional(),
  password: Joi.string().optional().allow(''),
  newPassword: Joi.string().optional().allow(''),
  confirmPassword: Joi.string().optional().valid(Joi.ref('newPassword')).messages({
    'any.only': 'La confirmación de la contraseña no coincide con la nueva contraseña'
  }),
});

module.exports = {
  createColaboradorSchema,
  updateColaboradorSchema,
};
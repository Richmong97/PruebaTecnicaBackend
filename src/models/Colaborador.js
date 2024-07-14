const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Asegúrate de que esta ruta sea correcta

const Colaborador = sequelize.define('Colaborador', {
  identidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'colaborador', // Asegúrate de que el nombre de la tabla sea correcto
  timestamps: true // Si no tienes timestamps en la tabla
});

module.exports = Colaborador;

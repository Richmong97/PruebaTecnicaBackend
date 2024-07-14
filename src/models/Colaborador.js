const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Asegúrate de que esta ruta sea correcta
const bcrypt = require('bcrypt');

const Colaborador = sequelize.define('Colaborador', {
  identidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  underscored: true,
});

Colaborador.beforeSave(async (colaborador, options) => {
  if (colaborador.password) {
    colaborador.password = await bcrypt.hash(colaborador.password, 10);
  }
});

module.exports = Colaborador;

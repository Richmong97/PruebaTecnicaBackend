const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize'); // Ajusta la ruta según tu estructura

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

module.exports = User;

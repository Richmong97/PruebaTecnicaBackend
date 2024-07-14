const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true,
    define: {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
      deletedAt: 'deleted_at',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Conectado Exitosamente!');
    console.log('Happy Hacking!');
  } catch (error) {
    console.error('No fue posible crear la conexión con Sequelize', error);
    sequelize.close();
  }
}

testConnection();

module.exports = sequelize;

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa el middleware CORS
const apiColaboradorController = require('./Controller/apiColaboradorController');
const apiAuthController = require('./Controller/apiAuthController');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Configura CORS para permitir todas las solicitudes desde localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con tu URL de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', apiAuthController);
app.use('/api', apiColaboradorController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

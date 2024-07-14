const express = require('express');
const router = express.Router();
const basicAuth = require('basic-auth');
const { compareHashedPassword } = require('../../helpers/encrypts'); // Ruta actualizada
const { ApiResponse, ApiError } = require('../../helpers/functions'); // Ruta actualizada

// Middleware BasicAuth para seguridad básica
router.use((req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== process.env.BASIC_AUTH_USERNAME || user.pass !== process.env.BASIC_AUTH_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Unauthorized Access');
  }
  
  next();
});

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Lógica para verificar las credenciales
    if (username === process.env.BASIC_AUTH_USERNAME && await compareHashedPassword(password, process.env.BASIC_AUTH_PASSWORD_HASH)) {
      return res.status(200).json(new ApiResponse({
        statusCode: 200,
        message: 'Login successful',
        success: true,
        data: { username }, // Opcional: Puedes enviar más datos del usuario si es necesario
        title: 'Success'
      }));
    } else {
      throw new ApiError({ statusCode: 401, message: 'Unauthorized', title: 'Error' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(error.statusCode || 500).json(new ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      success: false,
      title: 'Error'
    }));
  }
});

module.exports = router;

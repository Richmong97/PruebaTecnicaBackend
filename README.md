# Proyecto Backend

## Descripción

Este proyecto es el backend para la gestión de colaboradores. Está construido utilizando Node.js, Express, y Sequelize con MySQL.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio-backend.git
   cd tu-repositorio-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables (ajusta según sea necesario):

   ```plaintext
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_DATABASE=nombre_base_datos
   DB_PORT=3306
   BASIC_AUTH_USERNAME=admin
   BASIC_AUTH_PASSWORD=password
   ```

4. Ejecuta el servidor:

   ```bash
   npm start
   npm run dev (Nodemon)
   npm run migrate
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

- `models/`: Contiene los modelos de Sequelize.
- `controllers/`: Contiene los controladores de Express.
- `routes/`: Contiene las definiciones de rutas.
- `helpers/`: Contiene funciones de ayuda y validaciones.

## Endpoints

- `GET /api/colaboradores`: Obtiene todos los colaboradores.
- `POST /api/colaboradores`: Crea un nuevo colaborador.
- `PUT /api/colaboradores/:id`: Actualiza un colaborador.
- `DELETE /api/colaboradores/:id`: Elimina un colaborador.
- `GET /api/colaboradores/identidad/:identidad`: Obtiene un colaborador por identidad.
- `GET /api/colaboradores/count`: Obtiene el conteo de colaboradores.

## Dependencias

- Express
- Sequelize
- MySQL2
- Joi
- Dotenv
- bcrypt
- cors
- basic-auth

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

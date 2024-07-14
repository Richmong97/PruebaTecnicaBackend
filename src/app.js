const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const apiColaboradorController = require('./Controller/apiColaboradorController');
const apiAuthController = require('./Controller/apiAuthController');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', apiAuthController);
app.use('/api', apiColaboradorController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

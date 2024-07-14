const express = require('express');
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;

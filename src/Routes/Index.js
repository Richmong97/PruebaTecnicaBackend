const express = require('express');
const authRoutes = require('./authRoutes');
const colaboradoresRoutes = require('./colaboradoresRoutes');

const router = express.Router();

router.use(authRoutes);
router.use(colaboradoresRoutes);

module.exports = router;

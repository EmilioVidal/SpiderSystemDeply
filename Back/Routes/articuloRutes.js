const express = require('express');
const router = express.Router();
const { getArticulos } = require('../Controllers/articulos');

// Ruta para obtener artículos
router.get('/getarticulos', getArticulos);

module.exports = router;

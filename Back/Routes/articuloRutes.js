const express = require('express');
const router = express.Router();
const { getArticulos,getTotalArticulos,getTotalProductos } = require('../Controllers/articulos');

// Ruta para obtener artículos
router.get('/getarticulos', getArticulos);
//Ruta para obtener el total 
router.get('/getTotalArticulos',getTotalArticulos);
//Ruta para contar los estados
router.get('/gettotalproductos', getTotalProductos);



module.exports = router;

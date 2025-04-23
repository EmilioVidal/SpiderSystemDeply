require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const loginRoutes = require('./Rutas/loginRutas');
const { connectToHANA } = require('./confDB');

// Middleware
app.use(cors());
app.use(express.json());


// Rutas de la API
app.use('/login', loginRoutes);



//El servidor link
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await connectToHANA();
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});
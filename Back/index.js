require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://spidersystemdeply-production.up.railway.app';


app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const loginRoutes = require('./Routes/loginRutas');
const articuloRoutes = require('./Routes/articuloRutes');
const { connectToHANA } = require('./Config/confDB');

// Rutas de la API
app.use('/api/login', loginRoutes);
app.use('/api', articuloRoutes);

// El servidor link
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await connectToHANA();
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

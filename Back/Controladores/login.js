const { connection } = require('../confDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "seguridad";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const query = `CALL GET_USER_BY_EMAIL(?)`;

        connection.exec(query, [email], async (err, result) => {
            if (err) {
                console.error("Error en la consulta de usuario:", err.message);
                return res.status(500).json({ message: 'Error al buscar correo', error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.PASSUSR);
            if (!match) {
              return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            const token = jwt.sign(
                {
                  id: user.IDUSR,
                  name: user.NAMEUSR,
                  email: user.EMAILUSR,
                  role: user.IDROL
                },
                SECRET_KEY,
                { expiresIn: '1h' }
              );

              return res.status(200).json({
                message: 'Login exitoso',
                token,
                user: {
                  id: user.IDUSR,
                  name: user.NAMEUSR,
                  email: user.EMAILUSR,
                  profilePic: user.PROFILEPIC,
                  role: user.IDROL
                }
            });
        });

    } catch (error) {
        console.error("Error en el login:", error.message);
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

const { executeQuery } = require('../Utils/dbUtils');

// Function para visualizar todos los artículos
exports.getArticulos = async (req, res) => {
  try {
    //Llamo a la función para que ejecuta el Query
    const result = await executeQuery(`CALL ArticulosDTO()`);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No se encontraron artículos" });
    }

    return res.status(200).json({
      message: "Artículos obtenidos exitosamente",
      data: result
    });
    
  } catch (error) {
    console.error("Error en getArticulos:", error.message);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

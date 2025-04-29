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

//Function para obtener el total de productos
exports.getTotalArticulos = async (req,res) => {
  try{
    //Llamo la función para que pueda correr el stored procedure
    const result = await executeQuery('Call contarProductos()')

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No se encontró información de productos" });
    }
    return res.status(200).json({
      message: "Total de productos obtenido exitosamente",
      data: result
    });
  } catch (error){
    console.error("Error en getTotalProductos:", error.message);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

//Function para contar los estados
exports.getTotalProductos = async (req, res) => {
  try {
    const result = await executeQuery(`CALL CONTARESTADOS()`);

    //console.log('RESULTADO DEL STORED:', result);

    const estados = {};

    if (Array.isArray(result)) {
      result.forEach(row => {
        const estadoNombre = row.ESTADO || 'Desconocido';
        const total = row.TOTAL || 0;

        estados[estadoNombre] = total;
      });
    }

    return res.status(200).json({
      message: "Total de productos obtenido exitosamente",
      data: estados
    });

  } catch (error) {
    console.error("Error en getTotalProductos:", error.message);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};




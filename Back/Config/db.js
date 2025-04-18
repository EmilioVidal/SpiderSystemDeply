const hana = require("@sap/hana-client");

const hanaConfig = {
  serverNode: process.env.HANA_SERVER,  
  uid: process.env.HANA_USER,
  pwd: process.env.HANA_PASSWORD,
  encrypt: true,
};

//Se conecta a hana
const conn = hana.createConnection();

//Conectar a SAP HANA
conn.connect(hanaConfig, (err) => {
  if (err) {
    console.error("Error conectando a SAP HANA:", err);
  } else {
    console.log("Conectado a SAP HANA Cloud!");
  }
});

//Exportar la conexión para que se pueda usar en otros archivos
module.exports = conn;

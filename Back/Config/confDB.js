//confDB.js
require('dotenv').config();
const hana = require('@sap/hana-client');

const connParams = {
    serverNode: process.env.HANA_SERVER,
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD,
};

const connection = hana.createConnection();

function connectToHANA() {
    return new Promise((resolve, reject) => {
        try {
            connection.connect(connParams);
            console.log("Conectado a SAP HANA");
            resolve(connection);
        } catch (error) {
            console.error("Error al conectar a SAP HANA:", error);
            reject(error);
        }
    });
}

module.exports = { connection, connectToHANA };

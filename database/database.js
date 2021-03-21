const mysql2 = require('mysql2');
const config = require('config');

const databaseSQL = config.get('databaseSQL');

const database = mysql2.createPool(databaseSQL);

module.exports = { database }


// require dotenv to access environment variables from hidden file
require("dotenv").config();
const mysql = require("mysql");

var connection = mysql.createConnection({
    // connection data imported from .env file
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
    if (err) {
        console.error("Error connecting" + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

module.exports = connection;
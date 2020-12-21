const mysql = require('mysql2')

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: ''
}).promise()

module.exports = database
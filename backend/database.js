const Pool = require('pg').Pool;

const pool = new Pool({
    user: "sinanyilmaz",
    password: "sinan123",
    database: "perntodo",
    host: "localhost",
    port: '5432'
});


module.exports = pool
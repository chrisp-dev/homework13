// Get MySQL up and running!
const mysql = require('mysql');

// Create Connection Object
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'burgeregrub_db'
});

// Connect
connection.connect((err) => {
    if (err) {
        console.error("ERROR Connection to Database: " + err.stack);
        return;
    }
    console.log("SUCCESS Connected to DB as Id " + connection.threadId);
});

// Export connectoin for our ORM to use
module.exports = connection;
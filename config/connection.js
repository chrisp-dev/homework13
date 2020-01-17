// Get MySQL up and running!
const mysql = require('mysql');
const env = process.env.NODE_ENV || 'development';
let config = require('./config.json')[env];
if (!config) {
    config = process.env.DATABASE_URL;
}
// Create Connection Object
const connection = mysql.createConnection(config);

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
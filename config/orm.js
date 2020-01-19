// Import DB Connection
const connection = require('./connection');

/**
 * printQuestionMarks
 * @description Helper function to utilize sterilization from the Mysql module
 * @usage One question mark is for values, Two is for Columns and Tables
 */
const printQuestionMarks = (num) => new Array(num).fill("?").toString();

/**
 * parseSql(obj)
 * Converts object key/value pairs to SQL
 */
const parseSql = (obj) => {
    const sql = [];

    for (let key in obj) {
        let val = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof val === 'string' && val.indexOf(' ') >= 0) {
                val = '\'' + val + '\'';
            }

            sql.push(key + '=' + val);
        }
    }

    return sql.toString();
}

/**
 * orm
 * This is what is exported.
 * This is what is used to CRUD data in the DB.
 */
const orm = {
    all: function (tableName, done) {
        const qs = `SELECT * FROM ??;`;
        connection.query(qs, tableName, function (err, result) {
            if (err) {
                console.error(err);
            }
            done(result);
        });
    },
    create: function (tableName, body, done) {
        const cols = [];
        const vals = [];

        for (let atom in body) {
            cols.push(atom);
            vals.push(body[atom]);
        }

        let qs = `INSERT INTO ${tableName}`;
        qs += ` (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;

        connection.query(qs, vals, function (err, result) {
            if (err)
                console.error(err);
            done(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += parseSql(objColVals); // devoured=true
        queryString += " WHERE ";
        queryString += condition; // id = 1

        connection.query(queryString, function (err, result) {
            if (err) {

                console.error(err);
            }

            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {

                console.error(err);
            }

            cb(result);
        });
    }
}


module.exports = orm;
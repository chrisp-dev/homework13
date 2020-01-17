// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burgeregrub = {
    all: function (done) {
        orm.all("burgeregrub", function (res) {
            done(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, done) {
        orm.create("burgeregrub", cols, vals, function (res) {
            done(res);
        });
    },
    update: function (objColVals, condition, done) {
        orm.update("burgeregrub", objColVals, condition, function (res) {
            done(res);
        });
    },
    delete: function (condition, done) {
        orm.delete("burgeregrub", condition, function (res) {
            done(res);
        });
    }
};

// Export the database functions for the controller (burgeregrub.controller.js).
module.exports = burgeregrub;

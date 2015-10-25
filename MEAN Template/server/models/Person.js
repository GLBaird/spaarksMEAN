/**
 * Mongoose Schema - Person
 * MODEL Class
 *
 */
var schema = require("mongoose").Schema;

var Person = new schema({
    surname:   { type: String, required: true },
    forename: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true }
});

module.exports = Person;
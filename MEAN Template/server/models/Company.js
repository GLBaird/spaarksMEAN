/**
 * Mongoose Schema - Company
 * MODEL Class
 *
 */
var schema = require("mongoose").Schema;

var Company = new schema({
    name:   { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true }
});

module.exports = Company;
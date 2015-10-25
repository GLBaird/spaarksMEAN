/**
 * Mongoose Schema - Contact
 * MODEL Class
 *
 */
var schema = require("mongoose").Schema;

var Contact = new schema({
    name:   { type: String, required: true },
    email:  {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    number: {
        type: String,
        required: true
    }
});

module.exports = Contact;
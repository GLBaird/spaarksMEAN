// setup API router
var restful = require("node-restful");

/**
 * Contacts API Restful Interface (/contacts)
 * @param {express} app  instance of express()
 * @returns {Function}
 * @constructor
 */

function ContactAPIRoute(app) {

    // setup restful
    var rest = restful
        .model("Contact", app.models.Contact)
        .methods(["get", "put", "post", "delete"]);

    // register route and app with restful service
    rest.register(app, "/contacts");

    // return the middleware
    return function(req, res, next) {
        next();
    };
}

module.exports = ContactAPIRoute;



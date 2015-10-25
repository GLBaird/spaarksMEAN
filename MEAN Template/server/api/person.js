// setup API router
var restful = require("node-restful");


function PersonRoute(app) {

    // setup restful
    var rest = restful
        .model("Person", app.models.Person)
        .methods(["get", "put", "post", "delete"]);

    // register route and app with restful service
    rest.register(app, "/persons");

    // return the middleware
    return function(req, res, next) {
        next();
    };
}

module.exports = PersonRoute;



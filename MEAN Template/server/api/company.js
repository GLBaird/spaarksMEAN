// setup API router
var restful = require("node-restful");


function CompanyRoute(app) {

    // setup restful
    var rest = restful
        .model("Company", app.models.Company)
        .methods(["get", "put", "post", "delete"]);

    // register route and app with restful service
    rest.register(app, "/companies");

    // return the middleware
    return function(req, res, next) {
        next();
    };
}

module.exports = CompanyRoute;



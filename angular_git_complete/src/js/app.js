// Application Bootstrap
// declare app dependencies
module.explorts =
    angular

        // Create Application Module
        .module("AngularGit", ['ngRoute'])

        // declare services
        .factory("GithubData", require("./services/GithubData").service)

        // Load Controllers
        .controller("TabSearchController", require("./controllers/TabSearchController").controller)
        .controller("InfoController",      require("./controllers/InfoController").controller)
        .controller("ReposController",     require("./controllers/ReposController").controller)

        // define routing
        .config(["$routeProvider", require("./router")]);

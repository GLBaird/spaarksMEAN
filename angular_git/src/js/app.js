module.exports =
    angular
        .module("AngularGit", ["ngRoute"])

        // Services
        .factory("GitData", require("./services/GitData"))

        // Controllers
        .controller("InfoController", require("./controllers/InfoController"));
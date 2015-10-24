module.exports = function($routeProvider) {

    // declare application routes
    $routeProvider
        .when("/info", {
            templateUrl: "js/views/InfoController.html",
            controller: "InfoController"
        })
        .when("/info/:username", {
            templateUrl: "js/views/InfoController.html",
            controller: "InfoController"
        })
        .when("/repos/:username", {
            templateUrl: "js/views/ReposController.html",
            controller: "ReposController"
        })
        .otherwise({
            redirectTo: "/info"
        });

};
var routes = function($routeProvider) {

    $routeProvider
        .when("/view1", {
            templateUrl: "js/views/view1.html",
            controller: "View1Controller"
        })
        .when("/view2", {
            templateUrl: "js/views/view2.html",
            controller: "View2Controller"
        })
        .otherwise({
            redirectTo: "/view1"
        })

};

module.exports = routes;

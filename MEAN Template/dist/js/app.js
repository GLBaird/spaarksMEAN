(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var controllers = require("./controllers");

var app = angular
    .module("DemoApp", ["ngRoute"])

    // services
    .factory("DemoService", require("./services/demo"))

    // load controllers
    .controller(controllers.View1Controller.name, controllers.View1Controller.controller)
    .controller(controllers.View2Controller.name, controllers.View2Controller.controller)

    // load routes
    .config(["$routeProvider", require("./routes")]);

module.exports = app;
},{"./controllers":2,"./routes":5,"./services/demo":6}],2:[function(require,module,exports){
var controllers = {

    // View Controller for the first screen
    View1Controller: require("./view1_controller"),

    // View Controller for the second screen
    View2Controller: require("./view2_controller")

};

module.exports = controllers;
},{"./view1_controller":3,"./view2_controller":4}],3:[function(require,module,exports){
var View1Controller = {

    name: "View1Controller",
    html: "js/views/view1.html",
    controller: [
        "$scope", "DemoService",
        function ($scope, DemoService) {
            console.log("View is Running!");

            DemoService.do();

            // Will test this as well in unit test example
            $scope.welcome = "Welcome Text from Controller 1";

            // function for unit testing
            $scope.add10 = function(value) {
                return value + 10;
            }
        }
    ]

};

module.exports = View1Controller;
},{}],4:[function(require,module,exports){
var View2Controller = {

    name: "View2Controller",
    html: "js/views/view2.html",
    controller: [
        "$scope",
        function ($scope) {
            console.log("View is Running!");

            $scope.welcome = "Welcome Text from Controller 2";
        }
    ]

};

module.exports = View2Controller;
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var demo = [
    "$http",
    function($http) {
        console.log("Service is running: "+$http);

        function doSomething() {
            console.log("Doing something,.,,");
        }

        // Expose public apis
        return {
            do: doSomething
        }
    }
];

module.exports = demo;
},{}]},{},[1]);

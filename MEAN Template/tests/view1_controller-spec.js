// TESTS for View1Controller

// load app and all frameworks with require
var app = require("../src/js/app");

// Define unit test for controller
describe("View1Controller Tests", function() {

    console.log("Testing View1Controller");

    // load app module through mocks
    beforeEach(angular.mock.module("DemoApp"));

    var $controller;

    // define $controller by getting mocks to inject code into our variable
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    // test $scope with this controller
    describe("$scope tests", function() {

        // holding objects for $scope, DemoService and controller
        var scope, service, controller;

        // setup objects for each test
        beforeEach(function() {

            // fake object for scope testing (can also use $rootScope.new()
            // with Mocks to make a legit scope object!)
            scope = {};

            // make a fake demo service
            service = { do: function() { /* fake function  */ } };

            // setup spy on service
            spyOn(service, "do");

            // setup View1Controller and pass it the fake objects
            controller = $controller("View1Controller", {$scope: scope, DemoService: service});

        });

        it("Should load the View1Controller", function(){
            expect(controller).toBeDefined();
        });

        it("Should call the DemoService 'do' method", function() {
            expect(service.do).toHaveBeenCalled();
        });

        it("Should set $scope.welcome with 'Welcome Text from Controller 1'", function() {
            expect(scope.welcome).toEqual("Welcome Text from Controller 1");
        });

        it("should add 10 to value passed into scope method 'add10()", function() {
            expect(scope.add10(100)).toEqual(110);
        });

    });

});
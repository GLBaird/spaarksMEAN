"use strict";

var app = require("../src/js/app");

describe("AngularGit Unit Testing", function(){

    beforeEach( angular.mock.module("AngularGit") );

    var $controller, $rootScope, $location, $scope;

    beforeEach( inject(function(_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $rootScope  = _$rootScope_;
        $location   = _$location_;
    }) );

    describe("InfoController", function(){

        function makeInfoController(params, GHD){
           return $controller("InfoController", {
               $scope: scope,
               $rootScope: $rootScope,
               $routeParams: params,
               $location: $location,
               GithubData: GHD
           });
        }

        var InfoController, rootScope, scope;

        beforeEach(function() {
            rootScope = $rootScope.$new();
            scope = $rootScope.$new();

            InfoController = makeInfoController({ username: "TestUserName"}, {
                getRepoData: function ( username) {

                    // check data coming in
                    expect(username).toEqual("TestUserName");

                    return {
                        then: function (callbackA, callbackB) {
                            callbackA("TestData");
                            expect(scope.data).toEqual("TestData");
                            expect(rootScope.error).toBeUndefined();

                            callbackB("TestError");
                            expect(scope.data).toBeUndefined();
                            expect(rootScope.error).toEqual("TestError");
                        }
                    }
                }
            });
        });

        it("Should respond to $routeParams.username", function(){
            expect(rootScope.username).toEqual("TestUserName");
            expect(rootScope.accountName).toEqual("TestUserName");
        });

    });

});


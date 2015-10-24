(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Application Bootstrap
// declare app dependencies
module.explorts =
    angular

        // Create Application Module
        .module("AngularGit", [
            'ngRoute'
        ])

        // declare services
        .factory("GithubData", require("./services/GithubData").service)

        // Load Controllers
        .controller("TabSearchController", require("./controllers/TabSearchController").controller)
        .controller("InfoController",      require("./controllers/InfoController").controller)
        .controller("ReposController",     require("./controllers/ReposController").controller)

        // define routing
        .config(["$routeProvider", require("./router")]);

},{"./controllers/InfoController":2,"./controllers/ReposController":3,"./controllers/TabSearchController":4,"./router":5,"./services/GithubData":6}],2:[function(require,module,exports){
// define controller on main module
module.exports = {
    name: "InfoController",
    controller: [
        "$scope", "$rootScope", "$routeParams", "$location",
        require("../services/GithubData").name,
        function($scope, $rootScope, $routeParams, $location, GithubData){
            console.log("HI from the main controller");

            var getInfoFromGithub = function(event, username) {
                $location.path("/info/"+username);

                // use our service
                GithubData.getRepoData(username)
                    .then(function(data){
                        // success
                        $scope.data = data;
                        $rootScope.error = undefined;
                    }, function(msg){
                        // error!
                        $rootScope.error = msg;
                        $scope.data = undefined;
                    });
            };

            // Pass details to rootscope for TabSearchController
            if (typeof $routeParams.username !== "undefined") {
                $rootScope.username = $routeParams.username;
                $rootScope.accountName = $routeParams.username;
                getInfoFromGithub(null, $routeParams.username);
            }

            // listen for event from TabSearchController
            $scope.$on("getdata", getInfoFromGithub);

        }
    ]
};
},{"../services/GithubData":6}],3:[function(require,module,exports){
// define controller on main module
module.exports = {
    name: "ReposController",
    controller: [
        "$scope", "$rootScope", "$routeParams", "$location",
        require("../services/GithubData").name,
        function($scope, $rootScope, $routeParams, $location, GithubData){

            function updateReposList(username) {
                GithubData.getRepoData(username)
                    .then(function(data){
                        // success
                        $rootScope.error = undefined;
                        $scope.repos = data.repos;

                    }, function(msg){
                        // error
                        $rootScope.error = msg;
                    });
            }

            // get event from TabSearchController
            $scope.$on("getdata", function(event, username) {
                $location.path("/repos/"+username);
                updateReposList(username);
            });

            // do initial load of data
            updateReposList($routeParams.username);

            // Pass details to rootscope for TabSearchController
            if (typeof $routeParams.username !== "undefined") {
                $rootScope.username = $routeParams.username;
                $rootScope.accountName = $routeParams.username;
            }
        }
    ]
};
},{"../services/GithubData":6}],4:[function(require,module,exports){
// define controller on main module
module.exports = {
    name: "TabSearchController",
    controller: [
        "$scope", "$rootScope",
        function($scope, $rootScope) {
            $scope.askInfoControllerToGetData = function (username) {
                if (typeof username === "string" && username != "") {
                    $rootScope.error = undefined;
                    $rootScope.username = username;
                    $rootScope.$broadcast("getdata", username);
                } else {
                    $rootScope.error = "You need to enter a valid github user name!";
                }
            }
        }
    ]
};
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
// Service Controller Function
module.exports = {
    name: "GithubData",
    service: [
        "$http", "$q",
        function($http, $q){

            var cachedData = {};

            var getData = function(username) {
                console.log("Local data:", cachedData);


                // make and fulful a promise
                return $q(function(resolve, reject){

                    // check if data is cahced
                    if (cachedData[username]) {
                        resolve(cachedData[username]);
                    } else {

                        // make error handler
                        function handleError(response) {
                            reject("Network Error "+response.status+" "+response.statusText);
                        }

                        $http.get("https://api.github.com/users/"+username)
                            .then(function(response){
                                // we got the user data
                                cachedData[username] = response.data;

                                // load repos list
                                return $http.get("https://api.github.com/users/"+username+"/repos");
                            })
                            .then(function(response){
                                // we got the repos list
                                cachedData[username].repos = response.data;

                                // lookup contributors
                                response.data.forEach(function (repo) {
                                    repo.contributors = [];
                                    $http.get(repo.contributors_url)
                                        .then(function (response) {
                                            repo.contributors = response.data;
                                        });
                                });

                                // fulfil promise
                                resolve(cachedData[username]);

                            }, handleError);

                    }

                });
            };

            return {
                getRepoData: getData
            }
        }
    ]
};
},{}]},{},[1]);

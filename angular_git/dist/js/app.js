(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports =
    angular
        .module("AngularGit", ["ngRoute"])

        // Services
        .factory("GitData", require("./services/GitData"))

        // Controllers
        .controller("InfoController", require("./controllers/InfoController"));
},{"./controllers/InfoController":2,"./services/GitData":3}],2:[function(require,module,exports){
var InfoController = [
    "$scope", "$http",
    function($scope, $http) {
        console.log("Working");
    }
];

module.exports = InfoController;
},{}],3:[function(require,module,exports){
var GitData = [
    "$http", "$q",
    function ($http, $q) {

        var cachedData = {};

        function downloadFromGithub(username) {
            return $q(function (resolve, reject) {

                if (cachedData[username]) {
                    resolve(cachedData[username]);
                } else {

                    function handleErrors(res) {
                        reject("Network Error " + res.status + " " + res.statusText + " " + res.data);
                    }

                    $http.get("https://api.github.com/users/" + username)
                        .then(function(res) {
                            cachedData[username] = res.data;

                            return $http.get("https://api.github.com/users/" + username+"/repos");
                        })
                        .then(function(res) {
                            cachedData[username].repos = res.data;

                        }, handleErrors);
                }
            });
        }


        return {
            get: downloadFromGithub
        }
    }
];

module.exports = GitData;
},{}]},{},[1]);

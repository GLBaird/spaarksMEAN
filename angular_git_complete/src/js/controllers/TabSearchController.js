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

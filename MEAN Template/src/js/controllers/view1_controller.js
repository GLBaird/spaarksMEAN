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
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
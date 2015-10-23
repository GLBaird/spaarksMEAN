angular
    .module("MeanContacts", [])
    .controller("ListController", ["$http", "$scope", function($http, $scope) {
        console.log("Controller is running");

        // get latest data from APIs
        function errorHandler(res) {
            $scope.error = "DB Error "+res.status+" "+res.statusText+" "+res.data;
        }

        function update() {
            $http.get("/contacts")
                .then(function(res) {
                    $scope.contacts = res.data;
                    $scope.error = undefined;
                }, errorHandler);
        }

        function addNewContact() {
            if ($scope.new) {
                $scope.error = undefined;
                $http.post("/contacts", $scope.new)
                    .then(function(res) {
                        $scope.new = undefined;
                        update();
                    }, errorHandler);
            } else {
                $scope.error = "You must enter some values";
            }
        }

        function removeContact(id) {
            if (confirm("Are you sure?")) {
                $http.delete("/contacts/" + id)
                    .then(function (res) {
                        update();
                    }, errorHandler);
            }
        }

        function activateEditMode(contact) {
            $scope.new = contact;
            $scope.editMode = true;
        }

        function saveChanges() {
            $http.put("/contacts/"+$scope.new._id, {
                name: $scope.new.name,
                email: $scope.new.email,
                number: $scope.new.number
            })
                .then(function(res){
                    $scope.error = undefined;
                    $scope.new = undefined;
                    $scope.editMode = undefined;
                    update();
                }, errorHandler);
        }

        function cancelChanges() {
            $scope.new = undefined;
            $scope.editMode = undefined;
        }

        // get latest data
        update();

        // reveal public api
        $scope.add = addNewContact;
        $scope.remove = removeContact;
        $scope.edit = activateEditMode;
        $scope.save = saveChanges;
        $scope.cancelSave = cancelChanges;
    }]);
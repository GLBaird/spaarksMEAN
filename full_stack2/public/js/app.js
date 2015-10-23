// Angular App Mean Contacts
angular
    .module("MeanContacts", ["ngResource"])
    .controller(
        "ListController",
        ["$scope", "$resource", function($scope, $resource) {
            console.log("Controller ready");

            // load data model from connection to restful api
            var Contact = $resource("/contacts/:id", {id: "@id"}, { 'update': { method:'PUT' } });

            // load array of models into scope
            $scope.contacts = Contact.query();

            // crud methods
            function deleteContact(id) {
                if (confirm("You will delete your data, are you sure?")) {
                    Contact.get({id: id}, function (contact) {
                        contact.$delete({id:id});
                        $scope.contacts = Contact.query();
                    });
                }
            }

            function testData(data) {
                return typeof data === "object"
                    && typeof data.name === "string"
                    && typeof data.email === "string"
                    && typeof data.number === "string";
            }

            function handleDataError(res) {
                $scope.error = "Data Error - ";
                for(var prop in res.data.errors) {
                    $scope.error += res.data.errors[prop].message+". ";
                }
            }

            function addContact() {
                if (testData($scope.new)) {
                    $scope.error = undefined;
                    var newContact = new Contact($scope.new);
                    console.log(newContact);
                    newContact.$save()
                        .then(function() {
                            $scope.new = undefined;
                            $scope.contacts = Contact.query();
                        }, function(res) {
                            handleDataError(res);
                        });
                } else {
                    $scope.error = "Enter a name, valid email and number.";
                }
            }

            function updateContact() {
                $scope.new.$update({id: $scope.new._id})
                    .then(function() {
                        $scope.new = undefined;
                        $scope.error = undefined;
                        $scope.editMode = undefined;
                        $scope.contacts = Contact.query();
                    }, function(res) {
                        console.log(res);
                    });
            }

            function editContact(contact) {
                $scope.new = contact;
                $scope.editMode = true;
            }

            function cancelEdit() {
                $scope.new = undefined;
                $scope.editMode = undefined;
                $scope.contacts = Contact.query();
            }

            // expose functionality to view
            $scope.delete = deleteContact;
            $scope.add = addContact;
            $scope.edit = editContact;
            $scope.cancelEdit = cancelEdit;
            $scope.save = updateContact;
        }]);
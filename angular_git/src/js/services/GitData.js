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
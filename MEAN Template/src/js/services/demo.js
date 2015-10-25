var demo = [
    "$http",
    function($http) {
        console.log("Service is running: "+$http);

        function doSomething() {
            console.log("Doing something,.,,");
        }

        // Expose public apis
        return {
            do: doSomething
        }
    }
];

module.exports = demo;
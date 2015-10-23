// imports
var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser = require("body-parser");
var routes     = require("./server-restful");

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mean');
mongoose.connection.once('open', function() {

    // setup server and app
    var app = express();

    // Cross Origin Support (for Public APIs)
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin',  '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    // public static routes
    app.use(express.static("public"));
    app.use("/bower", express.static("bower_components"));

    // parse body data for restful APIs
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // Load the models.
    app.models = require('./server-models/index');

    // Load the Restful API routes.
    app.use("/contacts", routes.contacts(app));

    // 404 catch-all
    app.use("*", function(req, res) {
        res.status(404).send(
            "<h1>404 - File Not Found!</h1>" +
            "<p>Server Error, check the link of the file you requested." +
            "to start the app, click here: <a href='/'>start app</a></p>"
        );
    });

    // Start server
    app.listen(3000, function() {
        // Log in color the server port
        console.log("Server started on:\033[32m http://localhost:3000 \x1b[0m");
    });

});




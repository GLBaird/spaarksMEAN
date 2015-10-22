// server.js

var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");

var app = express();

// DB Functions
function openDB() {
    return mongojs("mean", ["contacts"]);
}

// Restful API - contacts

app.get("/contacts", function(req, res) {
    var db = openDB();
    db.contacts.find(function(err, docs){
        if (err) {
            res.status(500).send("DB Error");
        } else {
            res.json(docs);
        }
    });
});

app.get("/contacts/:id", function (req, res) {
    var search = req.params.id;
    var db = openDB();
    db.contacts.find({_id: db.ObjectId(search)}, function(err, docs){
        if (err) {
            res.status(500).send("DB Error");
        } else {
            res.json(docs[0]);
        }
    });
});

app.delete("/contacts/:id", function (req, res) {
    var id = req.params.id;
    var db = openDB();
    db.contacts.remove({_id: db.ObjectId(id)}, function(err){
        if (err) {
            res.status(500).send("DB Error");
        }
    });
    res.end();
});

app.use("/contacts", bodyParser.json());
app.use("/contacts", bodyParser.urlencoded({ extended: false }));

app.post("/contacts", function (req, res) {
    var data = req.body;
    if (typeof data === "object" && data.name && data.email && data.number) {
        var db = openDB();
        db.contacts.insert(data, function(err){
            if (err) {
                res.status(500).send("DB Error");
            } else {
                res.end();
            }
        });
    } else {
        res.status(500).send("Data model not valid");
    }
});

app.put("/contacts/:id", function (req, res) {
    var id = req.params.id;
    var data = req.body;
    var db = openDB();
    db.contacts.update({_id: db.ObjectId(id)}, data, function(err) {
        if (err) {
            res.status(500).send("DB Error");
        } else {
            res.end();
        }
    });
});


// Static Routing Paths for Bower and Client Side App
app.use("/bower", express.static("./bower_components"));
app.use(express.static("./public"));

app.use("*", function (req, res) {
    res.status(404).send("<h1>404 File Not Fount</h1><p>Please check the URL</p>");
});


// activate server
app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
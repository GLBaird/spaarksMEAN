var models = require("./models");

var Person = models.Person;
var Downloader = require("./Downloader");

var leon = new Person("Leon", "Baird");

leon.getFullName();


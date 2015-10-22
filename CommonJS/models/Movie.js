function Movie (title, director) {
    this.title = title;
    this.director = director;
}

Movie.prototype.getFullName = function() {
    return this.title + " " + this.director;
};


module.exports = Movie;
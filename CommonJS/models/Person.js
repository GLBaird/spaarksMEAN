/**
 * Person Class
 * @param {string} surname
 * @param {string} forename
 * @constructor
 */
function Person (surname, forename) {
    this.surname = surname;
    this.forename = forename;
}


/**
 *
 * @returns { { name:string, age:number } }
 * @private
 */
Person.prototype._getFullName = function() {
    return this.forename + " " + this.surname;
};


module.exports = Person;


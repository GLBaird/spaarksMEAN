/**
 * Server Restful APIs registry
 */
var ServerAPIs = {

    /**
     * Contacts - MongoDB Content on "mean" DB
     * GET, POST, PUT, DELETE
     */
    contacts: require("./contacts")

};

module.exports = ServerAPIs;
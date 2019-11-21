var mongoose = require("mongoose");
var users = require("./users"); /* Imports the Bugs module. It contains the bug schema we need. */
mongoose.connect("mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority"); //Test is the database name. 

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var user = mongoose.model("users", users.userSchema); //This creates the Bug model.
// var verif = mongoose.model("verif", users.verifSchema); //This creates the Bug model.

module.exports.user = user; /* Export the Bug model so index.js can access it. */
// module.exports.verif = verif; /* Export the Bug model so index.js can access it. */
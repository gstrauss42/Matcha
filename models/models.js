var mongoose = require("mongoose");
// var users = require("./users"); /* Imports the Bugs module. It contains the bug schema we need. */
mongoose.connect("mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority"); //Test is the database name. 

var db = mongoose.connection;

var userSchema = new mongoose.Schema({ //This is where bugSchema is defined.
   name: String,
   surname: String,
   email: String,
   verif_email: String,
   age: String,
   gender: String,
   prefferances: String,
   fame_rating: String,
   location: String,
   password: String,
   verif: String,
   isverified: { type: Boolean, default: false},
   tags: [{
      type: String
  }]
});

var holderSchema = new mongoose.Schema({
   name: String,
   surname: String,
   email: String,
   verif_email: String,
   age: String,
   gender: String,
   prefferances: String,
   fame_rating: String,
   location: String,
   password: String,
   verif: String,
   isverified: { type: Boolean, default: false},
   tags: [{
      type: String
  }]
})

var tagSchema = new mongoose.Schema({
   name: String,
   tag: String
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var hold = mongoose.model("hold", holderSchema); //This creates the Bug model.
var user = mongoose.model("users", userSchema); //This creates the Bug model.
var tag = mongoose.model("tags", tagSchema); //This creates the Bug model.

module.exports.hold = hold; /* Export the Bug model so index.js can access it. */
module.exports.user = user; /* Export the Bug model so index.js can access it. */
module.exports.tag = tag; /* Export the Bug model so index.js can access it. */
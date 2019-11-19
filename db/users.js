var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var userSchema = new mongoose.Schema({ //This is where bugSchema is defined.
     name: String,
     surname: String,
     email: String,
     password: String
});
 
module.exports.userSchema = userSchema; //Export bugSchema so that models.js can access it.
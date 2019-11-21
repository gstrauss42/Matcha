var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var userSchema = new mongoose.Schema({ //This is where bugSchema is defined.
     name: String,
     surname: String,
     email: String,
     age: String,
     gender: String,
     prefferances: String,
     password: String,
     verif: String,
     isverified: { type: Boolean, default: false}
});
 
// var verifSchema = new mongoose.Schema({
//      verif: String
// });

module.exports.userSchema = userSchema; //Export schemas so that models.js can access it.
// module.exports.verifSchema = verifSchema;
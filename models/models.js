var mongoose = require("mongoose");

var db = mongoose.connection;

var userSchema = new mongoose.Schema({ //This is where bugSchema is defined.
   name: String,
   username: String,
   bio: String,
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
   }],
   likes: [{
      type: String
   }],
   blocked: [{
      type: String
   }],
   notifications:[{
      type: String
   }],
   location_status: String,
   images: [{
      image0: { data: Buffer, contentType: String },
      image1: { data: Buffer, contentType: String },
      image2: { data: Buffer, contentType: String },
      image3: { data: Buffer, contentType: String },
      image4: { data: Buffer, contentType: String }
   }],
   connected: String,
   liked: String
});

var tagSchema = new mongoose.Schema({
   name: String,
   tag: String
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var user = mongoose.model("users", userSchema); //This creates the Bug model.
var tag = mongoose.model("tags", tagSchema); //This creates the Bug model.

module.exports.user = user; /* Export the Bug model so index.js can access it. */
module.exports.tag = tag; /* Export the Bug model so index.js can access it. */
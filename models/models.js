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
   contacts: [{
      type: String
   }],
   viewed: [{
      type: String
   }],
   views: [{
      type: String
   }],
   verif: String,
   reports: [{
      type: String
   }],
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
   fame: Number,
   old_notifications: [{
      type: String
   }],
   status: String,               //this is for if theyre online or offline. Will contain text "online" OR "offline-12:30"
   location_status: String,
   main_image: String,
   image_one: String, 
   image_two: String,
   image_three: String,
   image_four: String,
   connected: String,
   liked: String
});

var notificationsSchema = new mongoose.Schema({
   email: String,
   name:String,
   content: String,
   time: Number
})

var messagesSchema = new mongoose.Schema({
   message: String,
   to: String,
   from: String,
   time: String,
   read: Boolean
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Connected to MongoDB"); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var user = mongoose.model("users", userSchema); //This creates the Bug model.
var notifications = mongoose.model("notifications", notificationsSchema);
var messages = mongoose.model("messages", messagesSchema);

module.exports.user = user; /* Export the Bug model so index.js can access it. */
module.exports.notifications = notifications;
module.exports.messages = messages;
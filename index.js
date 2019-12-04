/*
 * Required External Modules
 */
const express = require("express");
const path = require("path");
// var multer = require('multer');
// var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');






/*
 * App Variables
 */
const app = express();
const port = process.env.PORT || "4040";



/*
 *  App Configuration
 */
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static('public'));
app.use('/js', express.static('views/js'));
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(session({secret: "secret session"}));












/*
 * Routes Definitions
 */
//home page
app.get("/", (req, res) => {
    res.render("index");
  });
// chat page
app.get("/chat", (req,res) => {
  res.render("chat");
})
// create page
app.get('/create', function (req, res) {
  res.render('create');
})
// forgot_password
app.get("/forgot_password", (req,res) => {
  res.render("forgot_password");
})
// login
app.get("/login", (req,res) => {
  res.render("login");
})
// matched_profile
app.get("/matched_profile", (req,res) => {
  res.render("matched_profile");
})
// notifications
app.get("/notifications", (req,res) => {
  res.render("notifications");
})
// search
app.get("/search", (req,res) => {
  res.render("search");
})



/*
 * Page Handling
 */
// login page
var login = require('./pages/login.js');
app.use('/login', login);

// create account
var create = require('./pages/create.js');
app.use('/create', create);

// chat
var chat = require('./pages/chat.js');
app.use('/chat', chat);

// forgot_password
var forgot_password = require('./pages/forgot_password.js');
app.use('/forgot_password', forgot_password);

// matched_profile
var matched_profile = require('./pages/matched_profile.js');
app.use('/matched_profile', matched_profile);

// matches
var matches = require('./pages/matches.js');
app.use('/matches', matches);

// notifications
var notifications = require('./pages/notifications.js');
app.use('/notifications', notifications);

// profile
var profile = require('./pages/profile.js');
app.use('/profile', profile);

// search_results
var search_results = require('./pages/search_results.js');
app.use('/search_results', search_results);

// search_user
var search_user = require('./pages/search_user.js');
app.use('/search_user', search_user);

// search
var search = require('./pages/search.js');
app.use('/search', search);

// add tag
var add_tag = require('./pages/add_tag.js');
app.use('/add_tag', add_tag);

// logout
var logout = require('./pages/logout.js');
app.use('/logout', logout);

// update_profile
var update_profile = require('./pages/update_profile.js');
app.use('/update_profile', update_profile);

// bio_update
var bio_update = require('./pages/bio_update.js');
app.use('/bio_change', bio_update);



// testing
var test = require('./pages/test.js');
app.use('/test', test);

// updating email
var email_update = require('./pages/email_update.js')
app.use('/check/:var_words', email_update);

// not the webpage youre looking for
var user_confirm = require('./pages/user_confirm.js')
app.use('/:var_words', user_confirm);
// app.get('/:var_words', function(req, res){
//    res.send('these are not the ' + req.params.var_words + '\'s you are looking for');
// });



/*
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
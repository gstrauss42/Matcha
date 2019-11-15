/*
 * Required External Modules
 */

const express = require("express");
const path = require("path");
var multer = require('multer');
var bodyParser = require('body-parser');


/*
 * App Variables
 */

const app = express();
const port = process.env.PORT || "4040";


/*
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));


/*
 * Routes Definitions
 */

// landing page
app.get("/", (req, res) => {
    res.render("index");
  });


/*
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


/*
 * Page Handling 
 */ 


// login page
var login = require('./pages/login.js');
app.use('/pages/login', login);

// create account
var create = require('./pages/create.js');
app.use('/pages/create', create);

// chat
// var chat = require('./theoretical_dissertations/chat.js');
// app.use('/theoretical_dissertations/chat', chat);

// // forgot_password
// var forgot_password = require('./theoretical_dissertations/forgot_password.js');
// app.use('/theoretical_dissertations/forgot_password', forgot_password);

// // matched_profile
// var matched_profile = require('./theoretical_dissertations/matched_profile.js');
// app.use('/theoretical_dissertations/matched_profile', matched_profile);

// // matches
// var matches = require('./theoretical_dissertations/matches.js');
// app.use('/theoretical_dissertations/matches', matches);

// // notifications
// var notifications = require('./theoretical_dissertations/notifications.js');
// app.use('/theoretical_dissertations/notifications', notifications);

// // profile
// var profile = require('./theoretical_dissertations/profile.js');
// app.use('/theoretical_dissertations/profile', profile);

// // search_results
// var search_results = require('./theoretical_dissertations/search_results.js');
// app.use('/theoretical_dissertations/search_results', search_results);

// // search_user
// var search_user = require('./theoretical_dissertations/search_user.js');
// app.use('/theoretical_dissertations/search_user', search_user);

// // not the webpage youre looking for
// app.get('/:var_words', function(req, res){
//    res.send('these are not the ' + req.params.var_words + '\'s you are looking for');
// });
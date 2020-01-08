// routing for socket has been disabled and instead I had included its handling directly in the html



/*
* App Variables
*/
const express   = require("express");
const app       = require('express')();
var   mongoose  = require('mongoose');
const path      = require("path");
var   session   = require('express-session');
var   http      = require('http').createServer(app);
var   server    = require('http').Server(app);
var   io        = require('socket.io')(server);

require('dotenv').config()

/*
*  App Configuration
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static('public'));
app.use('/js', express.static('views/js'));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: process.env.secret}));
mongoose.connect('mongodb+srv://gstrauss:' + process.env.password +'@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority');

/*
 * Server Activation
 */

http.listen(process.env.port, function(){
  console.log(`Listening to requests on http://localhost:${process.env.port}`);
});

/*
* Page Handling
*/


// 
io.sockets.on('connection', function(socket) {
  console.log("\nworks\n")
  // socket.emit('announcements', { message: '\nA new user has joined!\n' });
});

app.get('/chat', function (req, res) {
  res.render('/goinfre/gstrauss/matcha/views/chat.pug');
});



// 

// var declarations
var index           = require('./pages/index.js')
var home            = require('./pages/home.js')
var login           = require('./pages/login.js');
var create          = require('./pages/create.js');
var forgot_password = require('./pages/forgot_password.js');
var reset_password  = require('./pages/reset_password.js');
var user_confirm    = require('./pages/user_confirm.js')
var logout          = require('./pages/logout.js');
var profile         = require('./pages/profile.js');
var update_profile  = require('./pages/update_profile.js');
var email_update    = require('./pages/email_update.js')
var add_tag         = require('./pages/add_tag.js');
var bio_update      = require('./pages/bio_update.js');
var upload_picture  = require('./pages/upload_picture.js');
var notifications   = require('./pages/notifications.js');
var search          = require('./pages/search.js');
var matched_profile = require('./pages/matched_profile.js');
var chat            = require('./pages/chat.js');
var test            = require('./pages/test.js');

// mini-app calls
app.use('/', index)
app.use('/home', home)
app.use('/login', login);
app.use('/create', create);
// app.use('/chat', chat);
app.use('/forgot_password', forgot_password);
app.use('/matched_profile', matched_profile);
app.use('/notifications', notifications);
app.use('/profile', profile);
app.use('/search', search);
app.use('/add_tag', add_tag);
app.use('/logout', logout);
app.use('/update_profile', update_profile);
app.use('/bio_change', bio_update);
app.use('/reset_password', reset_password);
app.use('/upload_picture', upload_picture);
app.use('/check/:var_words', email_update);
app.use('/:var_words', user_confirm);




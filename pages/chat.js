const bodyParser = require('body-parser');
var models = require("../models/models");

var app = require('express')();
var server = require('http').Server(router);
var io = require('socket.io').listen(server).sockets;

var express = require('express');
var http = require('../index');
var router = express.Router();
// var io = require('socket.io')(http);




// rendering chat page
router.post('/', function(req, res) {
  // var io = require('socket.io')(http);
  res.render('chat.pug');
});





          // GABRIEL: fix this up to render the username(of current user) !!!!!!!!!!!
router.get('/', bodyParser.urlencoded(), function(req, res){
  models.user.findOne({ "_id" : req.body._id}, function(err, doc){
    res.render('chat', { username : doc.username});
  });
  res.render('chat.pug')
});





// connect to socket.io
io.on('connection', function() {

                    // GABRIEL: get db collection of the chat and put into an array as a result called 'res' (as used below) !!!!!!!!!!

    // emit chat history from db
    socket.emit('output', res);

    // handle message sending
    socket.on('input', function(data) {
        let message = data.message;

        // check for name and message
        if (message == '') {
          console.log('error: no message!');
        } else {
          
                      // GABRIEL: add the 'message' to the chat db !!!!!!!!!!!!!

          // emit new message
          io.emit('output', [data]);
        }
    });

})







// OLD ATTEMPT

// // on connect
// io.sockets.on('connection', function(socket){
//   connections.push(socket);
//   console.log('Connected: %s sockets connected', connections.length);

//   // on disconnect
//   socket.on('disconnect', function(data) {
//     connections.splice(connections.indexOf(socket), 1);
//     console.log('Disconnected: %s sockets connected', connections.length);
//   });

//   // on send message
//   socket.on('send message', function(data) {
//     console.log(data);
//     io.sockets.emit('new message', {msg: data});    //send the username in as well
//   });

// });

module.exports = router;
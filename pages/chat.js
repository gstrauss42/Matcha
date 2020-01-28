const bodyParser = require('body-parser');
var models = require("../models/models");

var app = require('express')();
var server = require('http').Server(router);
var io = require('socket.io').listen(server);

var express = require('express');
var http = require('../index');
var router = express.Router();
// var io = require('socket.io')(http);

router.get('/', function(req, res) {
  var io = require('socket.io')(http);
  res.render('chat.pug');
});

// router.get('/', bodyParser.urlencoded(), function(req, res){

//   // models.user.findOne({ "_id" : req.body._id}, function(err, doc){
//   //   console.log(doc);
//   //   res.render('chat', {name : doc.name,
//   //                       surname : doc.surname,
//   //                       _id : doc._id });
//   // });
//   res.render('chat.pug')
// });


// on connect
io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // on disconnect
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  // on send message
  socket.on('send message', function(data) {
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });

});

module.exports = router;
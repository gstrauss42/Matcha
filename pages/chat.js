const bodyParser = require('body-parser');
var models = require("../models/models");

var app = require('express')();
var server = require('http').Server(router);
var io = require('socket.io')(server);

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
//   //                       surname : doc.surname});
//   // });
//   res.render('chat.pug')
// });

io.on('connection', function(socket){
  console.log("connected:\nit worked!\n");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

module.exports = router;
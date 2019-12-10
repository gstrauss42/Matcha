var express = require('express');
// var http = require('http').Server(express);
// var io = require('socket.io')(http);
var router = express.Router();
var io = require('../index');

router.post('/', function(req, res){
   res.render('chat');
});

io.on('connection', function(socket){
  console.log("connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

module.exports = router;
var express = require('express');
var server = require('../index');
var io = require('socket.io')(server);
var router = express.Router();


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
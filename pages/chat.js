var express = require('express');
var http = require('../index');
var router = express.Router();
var io = require('socket.io')(http);

router.get('/', function(req, res, next){
  res.render('chat');

});

io.on('connection', function(socket){
  console.log("connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


module.exports = router;
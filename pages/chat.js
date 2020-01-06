var express = require('express');
var http = require('../index');
var router = express.Router();
var io = require('socket.io')(http);
var models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', bodyParser.urlencoded(), function(req, res){

  models.user.findOne({ "_id" : req.body._id}, function(err, doc){
    console.log(doc);
    res.render('chat', {name : doc.name,
                        surname : doc.surname});
  });
});

io.on('connection', function(socket){
  console.log("connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


module.exports = router;
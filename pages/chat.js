const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render("chat");
})

// rendering chat page
router.post('/', bodyParser.urlencoded({extended: true}), function(req, res) {
  console.log(req.body);
  // obtaining user info
  models.user.findOne({"email" : req.session.name}, function(err, doc){
    // obtaining chatter id
    models.user.findOne({ "_id" : req.body.id}, function(err, chatter){
      // calculations for sending messages
      if(req.body.sendMsg = 'sendMessage')
      {
        var present_time = Math.floor(Date.now() / 1000);
        var message = new models.messages ({
           message: req.body.message,
           to: doc.username,
           from: chatter.username,
           time: present_time
        })
        message.save(function(err){
           if(err)
              console.log(err);
           else
              console.log("updated notifications");
        })
      }
      // finding all messages and rendering them
      models.messages.find({$and: {"to": chatter.email, "from": doc.email}}, function(err, messages){
        models.messages.find({$and: {"to": doc.email, "from": chatter.email}}, function(err, messages_from){

          // from Jadon: you are sending me the logged in users info not the user who you are chatting to. Please correct
          res.render('chat.pug', {"username" : chatter.username, "messages": messages, "messages_from" : messages_from, "id" : req.body.id});
        
        });
      });
    });
  })
});

module.exports = router;
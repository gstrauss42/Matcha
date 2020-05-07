const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

// rendering chat page
router.post('/', bodyParser.urlencoded({extended: true}), function(req, res) {
  if(!req.session.name)
    res.render('oops', {error: '2'});
  else
  {
    console.log(req.body)
  // obtaining user info
  models.user.findOne({"email" : req.session.name}, function(err, doc){
    // obtaining chatter id
    models.user.findOne({ "_id" : req.body.id}, function(err, chatter){
      //creating new chat contact if not exists
      if(req.body.chat)
      {
        models.user.findOneAndUpdate({"email": req.session.name, $addToSet: {"contacts": chatter.email}}, function(err, contacts){
          console.log("updated contacts");
        });
        models.user.findOneAndUpdate({"email": chatter.email, $addToSet: {"contacts": req.session.name}}, function(err, temp){
          console.log("updated chatters contacts");
        })
      }
      // calculations for sending messages
      if(req.body.sendMsg == 'sendMessage')
      {
        var present_time = Math.floor(Date.now() / 1000);
        var message = new models.messages ({
           message: req.body.message,
           to: chatter.email,
           from: doc.email,
           time: present_time,
           read: false
        })
        message.save(function(err){
           if(err)
              console.log(err);
           else
              console.log("updated notifications");
        })
      }
      // finding all messages and rendering them
      models.messages.find({"to": chatter.email, "from": doc.email}, function(err, messages){
        models.messages.find({"to": doc.email, "from": chatter.email}, function(err, messages_from){
          messages_from.forEach(element => {
            element.read = true;
          });
          res.render('chat.pug', {"username" : chatter.username, "id" : req.body.id, "email": chatter.email});
        });
      });
    });
  })
  }
});

module.exports = router;
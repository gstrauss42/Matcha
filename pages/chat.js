const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

// rendering chat page
router.post('/', bodyParser.urlencoded({extended: true}), function(req, res) {
  models.user.findOne({"email" : req.session.name}, function(err, doc){
    models.user.findOne({ "_id" : req.body.id}, function(err, chatter){
      if("req.body.send" == '')
      {
        var present_time = Math.floor(Date.now() / 1000);
        var message = new models.messages ({
           message: "temp placeholder",
           to: "Welcome",
           from: "Welcome to matcha, may the love be with you",
           time: present_time
        })
        message.save(function(err){
           if(err)
              console.log(err);
           else
              console.log("updated notifications");
        })
      }
      models.messages.find({$and: {"to": chatter.email, "from": doc.email}}, function(err, messages){
        models.messages.find({$and: {"to": doc.email, "from": chatter.email}}, function(err, messages_from){
          res.render('chat.pug', {"username" : doc.username, "messages": messages, "messages_from" : messages_from});
        });
      });
    });
  })
});

module.exports = router;
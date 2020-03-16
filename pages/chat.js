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
    console.log(doc.username)
    // obtaining chatter id
    models.user.findOne({ "_id" : req.body.id}, function(err, chatter){
      console.log(chatter.username)
      // calculations for sending messages
      if(req.body.sendMsg = 'sendMessage')
      {
        var present_time = Math.floor(Date.now() / 1000);
        var message = new models.messages ({
           message: req.body.message,
           to: chatter.email,
           from: doc.email,
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
      models.messages.find({"to": chatter.email, "from": doc.email}, function(err, messages){
        models.messages.find({$and: {"to": doc.email, "from": chatter.email}}, function(err, messages_from){
          console.log("\n"+messages+"____________________________");
          console.log(messages_from);
          res.render('chat.pug', {"username" : chatter.username, "messages": messages, "messages_from" : messages_from, "id" : req.body.id});
        });
      });
    });
  })
});

module.exports = router;
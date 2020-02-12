const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

// rendering chat page
router.post('/', bodyParser.urlencoded({extended: true}), function(req, res) {
  models.user.findOne({"email" : req.session.name}, function(err, doc){
    models.user.findOne({ "_id" : req.body.email}, function(err, chatter){
      if("req.body.send")
      {
        models.messages.insert({"message": req.body.message}, {"to": chatter.email}, {"from": doc.email}, {"time": new Date});
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
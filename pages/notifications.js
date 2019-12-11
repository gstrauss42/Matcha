var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.user.findOne({email: req.session.name}, function(err, doc){
      res.render('notifications', {"notifications" : doc.notifications});
   });
});

router.post('/', function(req, res){
   res.send('POST route on Notifications');
});

//export this router to use in our index.js
module.exports = router;
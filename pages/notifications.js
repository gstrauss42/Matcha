var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.notifications.find({email: req.session.name}, function(err, doc){
      console.log(doc);
      res.render('notifications', {"notifications" : doc});
   });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   console.log(req.body)
   Models.user.findOne({email: req.session.name}, function(err, doc){
      if(req.body.dismiss == '')
      {
         // var dismissed = doc.notifications.splice(req.body.indentifier, 1);
         Models.notifications.findOneAndRemove(
            {_id: req.body._id},
            function(err, temp){
               console.log("deleted")
            });
         res.render('notifications', {"notifications" : doc.notifications});
         // update to move dismissed notifications to the seen section
      }
      else
      {
         console.log("\n\nCRITICAL ERROR CHECK NOTIFICATIONS FINAL ELSE, CAUSE WATAFAK\n\n");
         res.redirect('notifications');
      }
   });
});

//export this router to use in our index.js
module.exports = router;
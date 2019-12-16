var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.user.findOne({email: req.session.name}, function(err, doc){
      res.render('notifications', {"notifications" : doc.notifications});
   });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   console.log(req.body)
   Models.user.findOne({email: req.session.name}, function(err, doc){
      if(req.body.dismiss == '')
      {
         var dismissed = doc.notifications.splice(req.body.indentifier, 1);
         doc.old_notifications.unshift(dismissed);
         doc.save(console.log("dismissed"));
         res.render('notifications', {"notifications" : doc.notifications}, {"old_notifications" : doc.old_notifications});
         // update to move dismissed notifications to the seen section
      }
      else if(req.body.delete == '')
      {
         doc.old_notifications.splice(req.body.indentifier, 1);
         doc.save(console.log("deleted"));
         res.render('notifications', {"notifications" : doc.notifications}, {"old_notifications" : doc.old_notifications});
         // give delete functionality, waiting for a unique section to delete from
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
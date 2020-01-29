var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.notifications.find({email: req.session.name}, function(err, doc){
      res.render('notifications', {"notifications" : doc});
   });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   console.log(req.body);   
   if(req.body.dismiss == '')
      {
         Models.notifications.find({email: req.session.name}, function(err, doc){
            console.log(doc[req.body.identifier]._id)
            Models.notifications.findOneAndDelete(
               {_id: doc[req.body.identifier]._id},
               function(err, temp){
                  console.log("deleted")
               });
            res.redirect('/notifications');
            // update to move dismissed notifications to the seen section
         });
      }
      else
      {
         console.log("\n\nCRITICAL ERROR CHECK NOTIFICATIONS FINAL\n\n");
         res.redirect('notifications');
      }
});

//export this router to use in our index.js
module.exports = router;
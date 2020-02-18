var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   if(!req.session.name)
   {
      return(res.render("oops"));
   }
   else
   {
      Models.notifications.find({email: req.session.name}, function(err, doc){
         res.render('notifications', {"notifications" : doc});
      });
   }
});

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
   // if(req.body.dismiss == '')
      // {
         Models.notifications.find({email: req.session.name}, function(err, doc){
            if(doc[req.body.identifier])
            {
               Models.notifications.deleteOne(
                  {_id: doc[req.body.identifier]._id},
                  function(err, temp){
                     console.log("notification deleted" + temp)
                  });
            }
            res.redirect('/notifications');
         });
      // }
      // else
      // {
      //    console.log("\n\nCRITICAL ERROR CHECK NOTIFICATIONS FINAL\n\n");
      //    res.redirect('notifications');
      // }
});

//export this router to use in our index.js
module.exports = router;
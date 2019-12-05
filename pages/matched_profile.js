var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   // make the identified a hidden input field rather than a url for routing   
   // get this info dynamically
   Models.user.findOne({"_id" : "5dde122fded99722842e234b"}, function(err, doc){
      res.render("matched_profile", {name : doc.name,
                                    surname:doc.surname,
                                    rating: doc.rating,
                                    gender: doc.gender,
                                    prefferances: doc.prefferances,
                                    age: doc.age,
                                    tags: doc.tags,
                                    location: doc.location,
                                    bio: doc.bio});
   });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   console.log(req.body);
   Models.user.findOne({"email": req.session.name}, function(err, doc){
      // decide how you want to configure liking
      if(req.body.like == '')
      {
         // use hidden input form to find user page and perform updates to db
         Models.user.findOneAndUpdate({email : req.session.name}, {"likes.email" : req.body.like}, function(err, ret){
            console.log("liked user");
         });
         res.redirect("matched_profile");
      }
      // get the back end for these next 2 working
      else if(req.body.fake == '')
      {
         res.redirect("matched_profile");
         console.log("reported fake user");
      }
      else if(req.body.block == '')
      {
         res.redirect("matched_profile");
         console.log("blocked user");
      }
      else
      {
         res.redirect("/matched_profile");
         console.log("how you do dis");
      }
   });
});

//export this router to use in our index.js
module.exports = router;
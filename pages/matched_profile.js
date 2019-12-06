var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', bodyParser.urlencoded(), function(req, res){
   // make the identified a hidden input field rather than a url for routing   
   // get this info dynamically
   Models.user.findOne({"_id" : req.body._id}, function(err, doc){
      res.render("matched_profile", {name : doc.name,
                                    surname:doc.surname,
                                    rating: doc.rating,
                                    gender: doc.gender,
                                    prefferances: doc.prefferances,
                                    age: doc.age,
                                    tags: doc.tags,
                                    location: doc.location,
                                    _id: req.body._id,
                                    liked: "0",
                                    bio: doc.bio});
   });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   Models.user.findOne({"email": req.session.name}, function(err, doc){
      if(req.body.like == '')
      {
         console.log(req.body);
         Models.user.findOne({"_id": req.body._id}, function(err, info){
            console.log(info)
            Models.user.findOneAndUpdate({email : req.session.name}, {"likes.email" : info.email}, function(err, ret){
               console.log("liked user");
            });
            res.render("matched_profile", {name : doc.name,
               surname:doc.surname,
               rating: doc.rating,
               gender: doc.gender,
               prefferances: doc.prefferances,
               age: doc.age,
               tags: doc.tags,
               location: doc.location,
               _id: doc._id,
               liked: "0",
               bio: doc.bio});
         });
      }
      // get the back end for these next 2 working
      else if(req.body.fake == '')
      {
         Models.user.findOne({"_id" : req.body._id}, function(err, doc){
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: doc._id,
                                          liked: "0",
                                          bio: doc.bio});
         });
         console.log("reported fake user");
      }
      else if(req.body.block == '')
      {
         Models.user.findOne({"_id" : req.body._id}, function(err, doc){
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: doc._id,
                                          liked: "0",
                                          bio: doc.bio});
         });
         console.log("blocked user");
      }
      else
      {
         Models.user.findOne({"_id" : req.body._id}, function(err, doc){
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: doc._id,
                                          liked: "0",
                                          bio: doc.bio});
         });
      }
   });
});

//export this router to use in our index.js
module.exports = router;
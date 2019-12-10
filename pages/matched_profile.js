var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded(), function(req, res){
   console.log('test');
   console.log(req.body);
   if(req.body.unique != '1')
   {
      if(req.body.like == '')
      {
         Models.user.findOne({"_id": req.body._id}, function(err, doc){
            Models.user.findOneAndUpdate(
               {email : req.session.name},
               {$push : {likes: doc.email}},
               function(err, ret){
                  console.log("liked user");
                  res.render("matched_profile", {name : doc.name,
                                                surname:doc.surname,
                                                rating: doc.rating,
                                                gender: doc.gender,
                                                prefferances: doc.prefferances,
                                                age: doc.age,
                                                tags: doc.tags,
                                                location: doc.location,
                                                _id: doc._id,
                                                liked: "1",
                                                bio: doc.bio});
            });
         });
      }
      else if(req.body.unlike == '')
      {
         console.log(req.session.name);
         Models.user.findOne({"_id": req.body._id}, function(err, doc){
            Models.user.findOneAndUpdate(
               {email : req.session.name},
               {$pull : {likes: doc.email}},
               function(err, ret){
                  console.log("unliked user");
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
                                                connected : "0",
                                                bio: doc.bio});
            });
         });
      }
      // get the back end for these next 2 working
      else if(req.body.fake == '')
      {
         Models.user.findOne({email : req.session.name}, function(err, check){
            Models.user.findOne({"_id" : req.body._id}, function(err, doc){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
               res.render("matched_profile", {name : doc.name,
                                             surname:doc.surname,
                                             rating: doc.rating,
                                             gender: doc.gender,
                                             prefferances: doc.prefferances,
                                             age: doc.age,
                                             tags: doc.tags,
                                             location: doc.location,
                                             _id: doc._id,
                                             "liked": liked,
                                             "connected": connected,
                                             bio: doc.bio});
            });
            console.log("reported fake user");
         });
      }
      else if(req.body.block == '')
      {
         Models.user.findOne({email : req.session.name}, function(err, check){
            Models.user.findOne({"_id" : req.body._id}, function(err, doc){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
               res.render("matched_profile", {name : doc.name,
                                             surname:doc.surname,
                                             rating: doc.rating,
                                             gender: doc.gender,
                                             prefferances: doc.prefferances,
                                             age: doc.age,
                                             tags: doc.tags,
                                             location: doc.location,
                                             _id: doc._id,
                                             "liked": liked,
                                             "connected": connected,
                                             bio: doc.bio});
            });
            console.log("blocked user");
         });
      }
      else
      {
         Models.user.findOne({email : req.session.name}, function(err, check){
            Models.user.findOne({"_id" : req.body._id}, function(err, doc){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: doc._id,
                                          "liked": liked,
                                          "connected": connected,
                                          bio: doc.bio});
            });
         });
      }
   }
   // start of the psuedo get
   else{

      Models.user.findOne({email : req.session.name}, function(err, check){
         Models.user.findOne({"_id" : req.body._id}, function(err, doc){
            connected = '0';
            liked = '0';
            if(check.likes)
            {
               if(check.likes.includes(doc.email))
               {
                  liked = '1';
                  if(doc.likes.includes(check.email))
                     connected = '1';
               }
            }
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: req.body._id,
                                          "liked": liked,
                                          "connected": connected,
                                          bio: doc.bio});
         });
      })
   }
});

//export this router to use in our index.js
module.exports = router;
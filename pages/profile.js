var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.user.find({"likes" : req.session.name}, function(err, count){
      Models.user.findOne({"email":req.session.name}, function(err, doc){
         res.render("profile", {name : doc.name,
                              surname:doc.surname,
                              email:doc.email,
                              username: doc.username,
                              
                              main :doc.images[0],
                              one :doc.images[0],
                              two :doc.images[0],
                              three :doc.images[0],
                              four :doc.images[0],
                              five:doc.images[0],

                              views : doc.notifications.length,
                              liked: doc.likes.length, // i need an array of the people ive liked
                              likes: count.length, // i need an array of the people who've liked me
                              rating: doc.rating,
                              gender: doc.gender,
                              prefferances: doc.prefferances,
                              age: doc.age,
                              count: doc.notifications.length,
                              tags: doc.tags,
                              location: doc.location,
                              bio: doc.bio});
                           });
   });
});

//export this router to use in our index.js
module.exports = router;
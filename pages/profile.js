var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/update_location', bodyParser.urlencoded({extended: true}), function(req, res){
   if(!req.session.name) {
      return(res.render('oops', {error: '2'}));
   } else {
      if (req.body.location_text) {
         Models.user.findOneAndUpdate({email: req.session.name}, {"location": req.body.location_text}, function(err, doc){
            if (err) {
               console.log('error updating location - profile');
            } else {
               console.log('updated location');
            }
         });
      }
      Models.user.findOne({email : req.session.name}, function(err, ret){
         res.redirect('/profile');
     });
   }
});

router.get('/', function(req, res){
   if(!req.session.name) {
      return(res.render('oops', {error: '2'}));
   } else {
      Models.user.findOne({"email":req.session.name}, function(err, doc){

         console.log('profile: ', doc.name,     //debug
                                 doc.surname,
                                 doc.email,
                                 doc.username,
                                 doc.views,
                                 doc.viewed,
                                 doc.likes,
                                 doc.liked,
                                 doc.fame,
                                 doc.gender,
                                 doc.prefferances,
                                 doc.age,
                                 doc.tags,
                                 doc.location_status,
                                 doc.location,
                                 doc.bio
         );

         res.render("profile", {name: doc.name,
                           surname: doc.surname,
                           email: doc.email,
                           username: doc.username,
                           one: doc.main_image,
                           two: doc.image_one,
                           three: doc.image_two,
                           four: doc.image_three,
                           five: doc.image_four,
                           views: doc.views,
                           viewed: doc.viewed,
                           likes: doc.likes,
                           liked: doc.liked, //when someone likes a profile - make sure that the person who did the 'liking' goes into the liked users array called 'liked'.
                                             // so if Gabriel liked Jadons profile. Put Gabriel into Jadons 'liked' array.
                           rating: doc.fame,
                           gender: doc.gender,
                           prefferances: doc.prefferances,
                           age: doc.age,
                           tags: doc.tags,
                           location_status: doc.location_status,
                           location: doc.location,
                           bio: doc.bio});
      });
   }
});

module.exports = router;
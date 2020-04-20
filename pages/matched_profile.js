var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
   console.log(req.body)
   if(!req.session.name)
   {
      return(res.redirect("oops"));
   }
   else
   {
      fs.readdir(process.env.path, function(err, items){
         items.forEach(element => {
             fs.unlink(process.env.path + '/' + element)
         });
     })
      Models.notifications.find({"email": req.session.name}, function(err, notif){
         if(req.body.unique != '1')
         {
            if(req.body.like == '')
            {
               Models.user.findOne({"_id": req.body._id}, function(err, doc){
                  // fame increment
                  rating = doc.fame + 1;
                  Models.user.findOneAndUpdate({"_id": req.body._id}, {fame: rating}, function(err, temp){
                     console.log("incremented fame rating");
                  });
                  // render and render checks
                  Models.user.findOneAndUpdate({email : req.session.name}, {$addToSet : {likes: doc.username}}, function(err, ret){
                     
                        connected = '0';
                        if(doc.likes.includes(ret.username)){
                           connected = '1';
                        }
                        console.log("liked user\nupdated notifications");
                        res.render("matched_profile", {name : doc.name,
                                                      email : doc.email,
                                                      surname:doc.surname,
                                                      username: doc.username,
                                                      status: doc.status,
                                                      rating: doc.fame,
                                                      gender: doc.gender,
                                                      prefferances: doc.prefferances,
                                                      age: doc.age,
                                                      tags: doc.tags,
                                                      location: doc.location,
                                                      _id: doc._id,
                                                      one :doc.main_image,
                                                      two :doc.image_one,
                                                      three :doc.image_two,
                                                      four :doc.image_three,
                                                      five :doc.image_four,
                                                      count : notif.length,
                                                      liked: "1",
                                                      "connected": connected,
                                                      bio: doc.bio});
                     console.log("\n" + connected + "\n");
                                    // like notification
                     var present_time = Math.floor(Date.now() / 1000);
                     var _notif = new Models.notifications ({
                        email: doc.email,
                        name: "liked",
                        content: "you where just liked by " + ret.username,
                        time: present_time
                     })
                     _notif.save(function(err){
                        if(err)
                           console.log(err);
                        else
                           console.log("updated notifications");
                     })
               });

               });
            }
            else if(req.body.unlike == '')
            {
               Models.user.findOne({"_id": req.body._id}, function(err, doc){
                  Models.user.findOneAndUpdate(
                     {email : req.session.name},
                     {$pull : {likes: doc.username}},
                     function(err, ret){
                        console.log("unliked user");
                        res.render("matched_profile", {name : doc.name,
                                                      surname:doc.surname,
                                                      username: doc.username,
                                                      status: doc.status,
                                                      email : doc.email,
                                                      rating: doc.fame,
                                                      gender: doc.gender,
                                                      prefferances: doc.prefferances,
                                                      age: doc.age,
                                                      count : notif.length,
                                                      tags: doc.tags,
                                                      one :doc.main_image,
                                                      two :doc.image_one,
                                                      three :doc.image_two,
                                                      four :doc.image_three,
                                                      five :doc.image_four,
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
               Models.user.findOneAndUpdate({"_id" : req.body._id}, {$push : {reports: "report info:\n" + req.body.details}}, function(err, doc){
                  Models.user.findOneAndUpdate({email : req.session.name}, {$push : {blocked: doc.email}}, function(err, check){
                     connected = '0';
                     liked = '0';
                     if(check.likes)
                     {
                        if(check.likes.includes(doc.username))
                        {
                           liked = '1';
                           if(doc.likes.includes(check.username))
                              connected = '1';
                        }
                     }
                     res.render("matched_profile", {name : doc.name,
                                                   surname:doc.surname,
                                                   username: doc.username,
                                                   status: doc.status,
                                                   rating: doc.fame,
                                                   email : doc.email,
                                                   gender: doc.gender,
                                                   prefferances: doc.prefferances,
                                                   count : notif.length,
                                                   age: doc.age,
                                                   one :doc.main_image,
                                                   two :doc.image_one,
                                                   three :doc.image_two,
                                                   four :doc.image_three,
                                                   five :doc.image_four,
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
               Models.user.findOne({"_id" : req.body._id}, function(err, doc){
                  Models.user.findOneAndUpdate({email : req.session.name}, {$push :{blocked : doc.email}}, function(err, check){
                     connected = '0';
                     liked = '0';
                     if(check.likes)
                     {
                        if(check.likes.includes(doc.username))
                        {
                           liked = '1';
                           if(doc.likes.includes(check.username))
                              connected = '1';
                        }
                     }
                     res.render("matched_profile", {name : doc.name,
                                                   surname:doc.surname,
                                                   username: doc.username,
                                                   status: doc.status,
                                                   rating: doc.fame,
                                                   email : doc.email,
                                                   gender: doc.gender,
                                                   prefferances: doc.prefferances,
                                                   age: doc.age,
                                                   tags: doc.tags,
                                                   one :doc.main_image,
                                                   two :doc.image_one,
                                                   three :doc.image_two,
                                                   four :doc.image_three,
                                                   five :doc.image_four,
                                                   location: doc.location,
                                                   count : notif.length,
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
               console.log("this is the one");
               Models.user.findOne({email : req.session.name}, function(err, check){
                  Models.user.findOne({"_id" : req.body._id}, function(err, doc){
                     connected = '0';
                     liked = '0';
                     if(check.likes)
                     {
                        if(check.likes.includes(doc.username))
                        {
                           liked = '1';
                           if(doc.likes.includes(check.username))
                              connected = '1';
                        }
                     }
                  res.render("matched_profile", {name : doc.name,
                                                surname:doc.surname,
                                                username: doc.username,
                                                status: doc.status,
                                                rating: doc.fame,
                                                gender: doc.gender,
                                                prefferances: doc.prefferances,
                                                age: doc.age,
                                                one :doc.main_image,
                                                two :doc.image_one,
                                                three :doc.image_two,
                                                four :doc.image_three,
                                                five :doc.image_four,
                                                email : doc.email,
                                                count : notif.length,
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
               // !!!

               // update notifications to save to the notifcations colection and not the notifications under the user collection
               
               // !!!
               Models.user.findOneAndUpdate({"_id" : req.body._id}, {$addToSet : {views : check.username }}, function(err, doc){
                  // notification of viewed profile
                  var present_time = Math.floor(Date.now() / 1000);
                  var _notif = new Models.notifications ({
                     email: doc.email,
                     name: "profile view",
                     content: check.username + ' viewed your profile!',
                     time: present_time
                  })
                  _notif.save(function(err){
                     if(err)
                        console.log(err);
                     else
                        console.log("updated notifications");
                  })
                  Models.user.findOneAndUpdate({"email" : req.session.name}, {"viewed": doc.username}, function(err, temp){
                     console.log("updated the view history")
                     // add a check to exclude adding people multiple times
                  });
                  connected = '0';
                  liked = '0';
                  if(check.likes)
                  {
                     if(check.likes.includes(doc.username))
                     {
                        liked = '1';
                        if(doc.likes.includes(check.username))
                           connected = '1';
                     }
                  }
                  res.render("matched_profile", {name : doc.name,
                                                surname:doc.surname,
                                                email : doc.email,
                                                username: doc.username,
                                                status: doc.status,
                                                rating: doc.fame,
                                                gender: doc.gender,
                                                prefferances: doc.prefferances,
                                                age: doc.age,
                                                one :doc.main_image,
                                                two :doc.image_one,
                                                three :doc.image_two,
                                                four :doc.image_three,
                                                five :doc.image_four,
                                                tags: doc.tags,
                                                count : notif.length,
                                                location: doc.location,
                                                _id: req.body._id,
                                                "liked": liked,
                                                "connected": connected,
                                                bio: doc.bio});
               });
            })
         }
      });
   }
});

//export this router to use in our index.js
module.exports = router;
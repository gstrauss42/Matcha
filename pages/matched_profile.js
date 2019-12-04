var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/:var_words', function(req, res){
   var ret = req.originalUrl.substring(17);
   // Models.user.findOne({"id" : ret}, function(err, val){
      // res.render("matched_profile" + val); //for the final one
   // });
   Models.user.findOne({"email":req.session.name}, function(err, doc){
      console.log(doc);
      res.render("matched_profile", {name : doc.name, surname:doc.surname ,rating: doc.rating, gender: doc.gender, prefferances: doc.prefferances, age: doc.age, tags: doc.tags, location: doc.location, bio: doc.bio});
   })
   // Models.user.findOne({id : check})
});

router.post('/matched_profile/:var_words', bodyParser.urlencoded(), function(req, res){
   var url = req.originalUrl.substring(17);
   // res.redirect('~/matched_profile/' + url);
   console.log(url);
   console.log(req.body);
   Models.user.findOne({"email": req.session.name}, function(err, doc){
      if(req.body.like == '')
      {
         console.log(req.originalUrl);
         Models.user.findOneAndUpdate({email : req.session.name}, {likes : req.body.like}, function(err, ret){
            console.log("liked user");
         });
         res.render("matched_profile" + url + doc);
      }
      // get the back end for these next 2 working
      else if(req.body.fake == '')
      {
         res.redirect("matched_profile" + url);
         console.log("reported fake user");
      }
      else if(req.body.block == '')
      {
         res.redirect("matched_profile/" + url);
         console.log("blocked user");
      }
      else
      {
         res.redirect("/matched_profile/" + url);
         console.log(req.body);
      }
   });
});

//export this router to use in our index.js
module.exports = router;
var express = require('express');
var router = express.Router();
var Model = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   Models.user.findOne({"email":req.session.name}, function(err, doc){
      console.log(doc);
      res.render("matched_profile", {name : doc.name, surname:doc.surname ,rating: doc.rating, gender: doc.gender, prefferances: doc.prefferances, age: doc.age, tags: doc.tags, location: doc.location, bio: doc.bio});
   })
});

router.post('/', bodyParser.urlencoded(), function(req, res){
   var user = new Model.user ({
      name: req.session.name,
      tag: req.body.tag
   });
   tags.save();
});

//export this router to use in our index.js
module.exports = router;
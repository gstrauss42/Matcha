var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/:var_words', function(req, res){
   var ret = req.originalUrl.substring(17);
   // Models.user.findOne({"id" : ret}, function(err, val){
      // res.render("matched_profile" + val); //for the final one
   // });
   res.render("matched_profile");
   // Models.user.findOne({id : check})
});

router.post('/:var_words', bodyParser.urlencoded(), function(req, res){
   if(req.body.like == '')
   {
      Models.user.findOneAndUpdate({email : req.session.name}, {likes : req.body.like}, function(err, ret){
         var url = req.originalUrl.substring(17); 
         res.redirect('/matched_profile/' + url);
         console.log("liked user");
      });
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
      res.redirect("matched_profile");
      console.log(req.body);
   }
});

//export this router to use in our index.js
module.exports = router;
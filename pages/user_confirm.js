var express = require('express');
var router = express.Router();
var Models = require("../models/models");

router.get('/', function(req, res){
   var check = req.originalUrl.substring(1);
   Models.user.findOneAndUpdate({ verif:check }, { $set : { isverified: "true"}}, function(err, doc) {
      if(doc){
         return res.render("reset_password", {url: check});
      }
   });
   return res.render("error");
})

//export this router to use in our index.js
module.exports = router;
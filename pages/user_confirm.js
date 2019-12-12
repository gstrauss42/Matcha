var express = require('express');
var router = express.Router();
var Models = require("../models/models");

router.get('/', function(req, res){
   var check = req.originalUrl.substring(1);
   Models.user.findOne({verif:check}, function(err, doc){
      if(doc && doc.isverified == false){
         Models.user.findOneAndUpdate(
            { verif:check },
            { $set : { isverified: "true"}}
            , function(err, _update) {
               res.redirect('/login');
         });
      }
      else
      {
         res.render("reset_password", {url: check});
      }
   })

   // res.redirect('/login');
});

//export this router to use in our index.js
module.exports = router;
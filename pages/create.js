var express = require('express');
var router = express.Router();
const app = express()
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));

var Models = require("../db/models");

router.post('/create', bodyParser.urlencoded(), function(req, res, next){
   
   var _user = new Models.user ({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email
   });

   bcrypt.hash(req.body.password, 10, function(err, hash){
      _user.password = hash;
   });



   Models.user.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
         //handle error here
      }
      //if a user was found, that means the user's email matches the entered email
      if (user)
      {
            var err = new Error('A user with that email has already registered. Please use a different email..')
           err.status = 400;
           return next(err);
      } 
      else
      {
         _user.save(function(err){
            if(err)
               console.error(error);
            else
               res.redirect('/');
         });
      }
   }); 
});



//export this router to use in our index.js
module.exports = router;
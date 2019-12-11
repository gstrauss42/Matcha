var express = require('express');
var router = express.Router();
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var Model = require("../models/models");
var crypto = require('crypto');
var randomstring = require("randomstring");
var nodeMailer = require('nodemailer');

router.post('/create', bodyParser.urlencoded(), function(req, res, next){
   Model.user.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
         //handle error here
      }
      if (user)
      {
            var err = new Error('A user with that email has already registered. Please use a different email..')
           err.status = 400;
           return next(err);
      } 
      else
      {
         console.log(req.body);
         var safe = crypto.pbkdf2Sync(randomstring.generate(), '100' ,1000, 64, `sha512`).toString(`hex`);
         var pass = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);
      
         var _user = new Model.user ({
            name: req.body.name,
            username: req.body.username,
            surname: req.body.surname,
            email: req.body.email,
            password: pass,
            age: req.body.age,
            gender: req.body.gender,
            prefferances: req.body.preferences,
            verif: safe,
            notifications: "Welcome to Matcha"
         });

         _user.save(function(err){
            if(err)
               console.error(error);
            else
            {
               // emailer

               let transporter = nodeMailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                      user: 'ftmatcha@gmail.com',
                      pass: 'qwerty0308'
                  }
               });

               var mailOptions = {
                  // should be replaced with real recipient's account
                  to: req.body.email,
                  subject: 'Email Confirmation',
                  text: 'please follow this link to validate your account localhost:4040/' + safe
               };

               transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
               });
               res.redirect('/');
               console.log("created account");
            }
         });
      }
   }); 
});

//export this router to use in our index.js
module.exports = router;
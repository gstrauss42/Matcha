var express = require('express');
var router = express.Router();
const app = express()
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));
var Models = require("../db/models");

var nodeMailer = require('nodemailer');

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
            {
               let transporter = nodeMailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                      // should be replaced with real sender's account
                      user: 'ftmatcha@gmail.com',
                      pass: 'qwerty0308'
                  }
              });

              var safe = bcrypt.hash(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), 10);
            

                 

                 console.log(safe);
                 
                 var mailOptions = {
                    // should be replaced with real recipient's account
                    to: req.body.email,
                    subject: 'words',
                    text: 'please follow this link to validate your account localhost:4040/'
                  };
                  
                  safe.then(data => {
                     mailOptions.text += safe;

               transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                   })


               });
               res.redirect('/');
            }
         });
      }
   }); 
});


//export this router to use in our index.js
module.exports = router;
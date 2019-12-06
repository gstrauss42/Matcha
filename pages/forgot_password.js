var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var Model = require("../models/models");

router.post('/', bodyParser.urlencoded(), function(req, res){

   Model.user.findOne({ email: req.body.email }, function(err, user) {
      if(user)
      {
         // emalier
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
            subject: 'Dont be like that',
            text: 'access is a tough thing to grant.... good thing you\'ve got an uncle in the software business (no copyrights where infringed in this email, any and all apparnt infringements are unintentional and entirely the viewers own bias)'
         };
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               return console.log(error);
            }
         });
      }
      else{

      }
   });

   

   res.redirect('/login');
});

//export this router to use in our index.js
module.exports = router;
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const Models = require('../models/models');
const crypto = require('crypto');
const request = require('request');

router.get('/', (req,res) => {
   res.render('login');
})

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){

   Models.user.findOne({ username: req.body.username }, { username : 1, password : 1, isverified : 1, email : 1 }, function(err, user) {
      if (user) {
         const safe = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);

            if (user.password == safe && user.isverified == true)
            {
               // ip tracking
               request(`https://ipinfo.io?token=${process.env.TOKEN}`, { json: true }, (err, res, body) => {
                  if (err) { 
                     return console.log('ipinfo.io error: ', err);
                  } else {
                     let ipLocat = `${body.city}, ${body.region}, ${body.country}, ${body.postal}`;
                     console.log('ipLocat: ', ipLocat);

                     Models.user.findOneAndUpdate({ username : req.body.username }, { location : ipLocat }, function(err, _update){
                        if (err) {
                           console.log('error updating location');
                        } else {
                           console.log('updated location');
                        }
                     });
                  }
               });
               // online status
               Models.user.findOneAndUpdate({ username : req.body.username }, { status : 'online' }, function(err, _update){
                  if (err) {
                     console.log('error updating status');
                  } else {
                     console.log('user set to online');
                  }
               });
              //setting session
               req.session.name = user.email;
               res.redirect('/profile');
            }
            else if (user.isverified !== true)
               res.render('oops', {error: '6'})
            else
               res.render('oops', {error: '1'});
      }
      else
      {
         res.render('oops', {error: '1'});
      }
   });
});

//export this router to use in our index.js
module.exports = router;
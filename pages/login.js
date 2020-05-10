var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var Models = require("../models/models");
var crypto = require('crypto');
const request = require('request');

router.get("/", (req,res) => {
   res.render("login");
})

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
   Models.user.findOne({ 'username': req.body.username }, function(err, user) {
      if(user)
      {
         var safe = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);

            if(user.password == safe && user.isverified == 1)
            {
               // ip tracking
               request(`https://ipinfo.io?token=${process.env.TOKEN}`, { json: true }, (err, res, body) => {
                  if (err) { 
                     return console.log('ipinfo.io error: ', err);
                  } else {
                     let ipLocat = `${body.city}, ${body.region}, ${body.country}, ${body.postal}`;
                     console.log('ipLocat: ', ipLocat); // debug
                     Models.user.findOneAndUpdate({ email : req.body.email }, { "location" : ipLocat }, function(err, _update){
                        if (err) {
                           console.log('error updating location');
                        } else {
                           console.log("updated location");
                        }
                     });
                  }
               });
               // online status
               Models.user.findOneAndUpdate({ email : req.body.email }, { "status" : "online" }, function(err, _update){
                  if (err) {
                     console.log('error updating status');
                  } else {
                     console.log("user set to online");
                  }
               });
              //setting session
               req.session.name = user.email;
               res.redirect('/profile');
            }
            else if (user.isverified !== 1)
               res.render("oops", {error: '6'})
            else
               res.render("oops", {error: '1'});
      }
      else
      {
         res.render("oops", {error: '1'});
      }
   });
});

//export this router to use in our index.js
module.exports = router;
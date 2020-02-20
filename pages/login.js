var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var Models = require("../models/models");
var crypto = require('crypto');
const requestIp = require('request-ip');

router.get("/", (req,res) => {
   res.render("login");
})

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
   Models.user.findOne({ email: req.body.email }, function(err, user) {
      if(user)
      {
         var safe = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);

            if(user.password == safe && user.isverified == 1)
            {
               const clientIp = requestIp.getClientIp(req);
               // ip tracking
               Models.user.findOneAndUpdate({ email : req.body.email },
               { "location" : clientIp },
               function(err, _update){
                      console.log("updated Ip Location");
               });
               Models.user.findOneAndUpdate({ email : req.body.email },
               { "status" : "online" },
               function(err, _update){
                   console.log("user set to online");
               });
              //setting session
               Models.user.findOne({email:req.body.email})
               req.session.name = req.body.email;
               res.redirect('/profile');
            }
            else
            res.send("Somethings wrong, please ensure you verified your account by following the link and that you typed your password in correctly");
               // res.redirect('/login');
      }
      else
      {
         res.render("login");
      }
   });
});

//export this router to use in our index.js
module.exports = router;
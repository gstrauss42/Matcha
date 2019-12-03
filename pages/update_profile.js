var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');
var crypto = require('crypto');
var randomstring = require("randomstring");
var nodeMailer = require('nodemailer');

router.get('/', function(req, res){
    res.redirect('/profile');
});

router.post('/', bodyParser.urlencoded(), function(req, res){
    
    if(req.body.bio)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "bio" : req.body.bio }
            , function(err, _update) {
                console.log("updated bio");
        });
    }
    if(req.body.name)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "name" : req.body.name }
            , function(err, _update) {
                console.log("updated name");
        });
    }
    if(req.body.surname)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "surname" : req.body.surname }
            , function(err, _update) {
                console.log("updated surname");
        });
    }
    if(req.body.age)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "age" : req.body.age }
            , function(err, _update) {
                console.log("updated age");
        });
    }
    if(req.body.gender_select)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "gender" : req.body.gender_select }
            , function(err, _update) {
                console.log("updated gender");
        });
    }
    if(req.body.pref_select)
    {
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "prefferances" : req.body.pref_select }
            , function(err, _update) {
                console.log("updated prefferaces");
        });
    }
    if(req.body.pass && req.body.repeat_pass && req.body.pass == req.body.repeat_pass)
    {
        var pass = crypto.pbkdf2Sync(req.body.pass, '100' ,1000, 64, `sha512`).toString(`hex`);
        Models.user.findOneAndUpdate({ email : req.session.name },
            { "password" : pass }
            , function(err, _update) {
                console.log("updated password");
        });
    }
    if(req.body.email)
    {
        Models.user.find({email : req.body.email}, function(err, yes){
            if(!yes[0])
            {
                var safe = crypto.pbkdf2Sync(randomstring.generate(), '100' ,1000, 64, `sha512`).toString(`hex`);
                console.log(req.body.email);
                Models.user.findOneAndUpdate({ email : req.session.name },
                    { $set : {"verif" : safe, "verif_email" : req.body.email}}
                    , function(err, _update) {

                        console.log("set new verif");
                });

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
                    to: req.body.email,
                    subject: 'Update Email',
                    text: 'please follow this link to validate your account localhost:4040/check/' + safe
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
                console.log("sent mail");
            }        
        });
    }
    // porifle doc passed for rendering
    Models.user.findOne({email : req.session.name}, function(err, ret){
        res.render(('profile'), {profile: ret});
    });

});
 
//export this router to use in our index.js
module.exports = router;
var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');
var crypto = require('crypto');

router.get('/', function(req, res){
    res.redirect('/profile');
});

router.post('/', bodyParser.urlencoded(), function(req, res){
    
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
    // if(req.body.email)
    // {
    //     Models.user.findOneAndUpdate({ email : req.session.name },
    //         { "email" : req.body.email }
    //         , function(err, _update) {
    //             console.log("updated email");
    //     });
    // }
    res.redirect("/profile");

});
 
//export this router to use in our index.js
module.exports = router;
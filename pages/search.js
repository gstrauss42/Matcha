var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
    Models.user.findOne({email: req.session.name}, function(err, doc)
    {
        Models.user.find({$and: [{gender: doc.prefferances}, {prefferances: doc.gender}]} , function(err, val){
            var tags = Array.from(doc.tags);
            res.render('search', {
                        "tags" : tags,
                        "count" : doc.notifications.length,
                        "basic_matches": Array.from(val)
            });
        });
    });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
    Models.user.findOne({email: req.session.name}, function(err, doc)
    {
        Models.user.find({$and: [{gender: doc.prefferances}, {prefferances: doc.gender}]} , function(err, val){
            let i = 0;
            while(val[i])
            {
                while(val[i])
                {
                    if(req.body.age)
                    {
                        if(val[i].age != req.body.age)
                        {
                            val.splice(i, 1);
                            break;
                        }
                    }
                    if(req.body.rating)
                    {
                        // get personal fame rating to compare againts results then do some sort of averaging or range
                        if(val[i].rating != doc.rating)
                        {
                            val.splice(i, 1);
                            break;
                        }
                    }
                    if(req.body.location)
                    {
                        // get personal location and then do some sort of location ranged based finding
                        if(val[i].location != doc.location)
                        {
                            val.splice(i, 1);
                            break;
                        }
                    }
                    // if(req.body.tags[0] && chop_check == val.length)
                    // {
                    //     // input sort once arrray of tags has been given
                    // }
                    i++;
                }
            }
            console.log(req.body);
            res.render('search', {
                        "tags" : doc.tags,
                        "count" : doc.notifications.length,
                        "basic_matches": Array.from(val)
            });
        });
    });
});

//export this router to use in our index.js
module.exports = router;
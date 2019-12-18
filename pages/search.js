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
        console.log(req.body);
        var p = 0;
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
                    if(doc.blocked && doc.blocked.includes(val[i].email))
                    {
                        val.splice(i, 1);
                        break;
                    }
                    
                    //find a way to match the blocks to who is blocked for filtering
                    if(doc.reported && doc.reported.contains(val[i].email))
                    {
                        console.log("a user was filtered due to blocking");
                        val.splice(i, 1);
                        break;
                    }


                    // if(req.body.p)
                    // if(req.body.)
                    // {
                    //     // input sort once arrray of tags has been given
                    // }
                    i++;
                }
            }
            if(req.body.check)
                console.log(req.body.check[0]);
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
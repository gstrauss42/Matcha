var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
    Models.user.find({email: req.session.name}, function(err, doc)
    {
        Models.user.find({$and: [{gender: doc[0].prefferances}, {prefferances: doc[0].gender}]} , function(err, val){
            res.render(('search'), {"basic_matches": Array.from(val)});
        });
    });
});

router.post('/', bodyParser.urlencoded(), function(req, res){
    Models.user.find({email: req.session.name}, function(err, doc)
    {
        Models.user.find({$and: [{gender: doc[0].prefferances}, {prefferances: doc[0].gender}]} , function(err, val){
            // var search becomes your index counter
            val.forEach(function(search, index){
            {
                if(req.body.age)
                {
                    if(search.age != req.body.age)
                        val.splice(index, 1);
                }
                else if(req.body.rating)
                {
                    // get personal fame rating to compare againts results then do some sort of averaging or range
                    if(search.rating != req.body.rating)
                        val.splice(index, 1);
                }
                else if(req.body.location)
                {
                    // get personal location and then do some sort of location ranged based finding
                    if(search.location != req.body.location)
                        val.splice(index, 1);
                }
                // explicit tags
                // ...
            }});
            res.render(('search'), {"basic_matches": Array.from(val)});
        });
    });
});

//export this router to use in our index.js
module.exports = router;
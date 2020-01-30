var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
    console.log("watafak");
    Models.user.findOne({email: req.session.name}, function(err, doc)
    {
        Models.user.find( {$and: [{gender: doc.prefferances}, {$or:[{prefferances: doc.gender}, {prefferances: "Bi-Sexual"}]}]} , function(err, val){
            console.log(val + "\n");
            var tags = Array.from(doc.tags);
            res.render('search', {
                        "tags" : tags,
                        "count" : doc.notifications.length,
                        "basic_matches": Array.from(val)
            });
        });
    });
});

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
    console.log("\n"+req.body+"\n");
    Models.user.findOne({email: req.session.name}, function(err, doc)
    {
        var p = 0;
        Models.notifications.find({"email": req.session.name}, function(err, notif){
            Models.user.find({$and: [{gender: doc.prefferances}, {$or:[{prefferances: doc.gender}, {prefferances: "Bi-Sexual"}]}]}, function(err, val){
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
                            if(val[i].fame != doc.fame)
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
                        // if(req.body.)
                        // {
                        //     // input sort once arrray of tags has been given
                        // }
                        i++;
                    }
                }
                // ordered filtering 
                i = 0;
                var p = 0;
                var temp;
                var count = 0;
                var ret = Array.from(val);
                if(req.body.filter_all == "Go!")
                {
                    if(req.body.filter == "age")
                    {
                        if(req.body.order == "ascending")
                        {
                            // refine the below algorithm

                            // p = ret[i];
                            // while(ret[0])
                            // {
                            //     while(ret[i])
                            //     {
                            //         if(ret[i] < p)
                            //         {
                            //             p = ret[i];
                            //         }
                            //         i++;
                            //     }
                            //     temp[count] = p;        
                            //     count++;
                            // }
                        }
                        else
                        {

                        }
                    }
                    else if(req.body.filter == "location")
                    {
                        if(req.body.order == "ascending")
                        {

                        }
                        else
                        {
                            
                        }
                    }
                    else if(req.body.filter == "rating")
                    {
                        if(req.body.order == "ascending")
                        {

                        }
                        else
                        {
                            
                        }
                    }
                    else if(req.body.filter == "common_tags")
                    {
                        if(req.body.order == "ascending")
                        {

                        }
                        else
                        {
                            
                        }
                    }
                }
                res.render('search', {
                            "tags" : doc.tags,
                            "count" : notif.length,
                            "basic_matches": ret
                });
            });
        });
        
    });
});

//export this router to use in our index.js
module.exports = router;
var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded(), function(req, res){

    Models.user.find(
        {"email" : req.session.name},
        function(err, details){
            var thegoodgood = '';
            if(req.body.age)
                thegoodgood += "{ \"age\" : \"" + req.body.age + "\" },"; 
            else if(req.body.location)
                thegoodgood += "{location :" + req.body.location + "},"; 
            else if(req.body.rating)
                thegoodgood += "{rating :" + req.body.rating + "},";
            else
                thegoodgood = "{ isverified : true },"
            thegoodgood = thegoodgood.substring(0, thegoodgood.length - 1);
            console.log(thegoodgood);
            Models.user.find(
                { $and: [thegoodgood,
                    
                    {"gender" : details[0].prefferances},
                    {"prefferances" : details[0].gender},
                    // {function("location")},
                    // {function("fame rating")},
                ]},
                function(err, doc){
                    // console.log(doc[0].name);
                    if(doc[0]){
                        res.send(doc);
                    }
                    else{
                        res.render('search');
                    }
                }
            )
        })

// age : name="age"
// nearby location : name="location"
// similar fame rating : name="rating"
// these fall under match submit button

// filter by (age, location, fame rating, tags in common) : name="filter"
//  order by (ascending, descending) : name="order"
// these fall under the displaying options which is the go submit button

    

//    res.render("search");
});

//export this router to use in our index.js
module.exports = router;
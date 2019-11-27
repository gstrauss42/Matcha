var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded(), function(req, res){

    Models.user.find(
        {"email" : req.session.name},
        function(err, details){
            Models.user.find(
                { $and: [{age: req.body.age},
                    
                    {"gender" : details[0].prefferances},
                    // {function("location")},
                    // {function("location")},
                    // {function("fame rating")},
                ]},
                function(err, doc){
                    console.log(details[0].prefferances);
                    // console.log(doc);
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
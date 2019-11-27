var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded(), function(req, res){

    Models.user.find({isverified: "true"},function(err, doc){
        if(doc)
        {
            res.send(doc);
        }
        else{
            res.render('search');
        }
    })
});

// age : name="age"
// nearby location : name="location"
// similar fame rating : name="rating"
// these fall under match submit button

// filter by (age, location, fame rating, tags in common) : name="filter"
//  order by (ascending, descending) : name="order"
// these fall under the displaying options which is the go submit button

    

//    res.render("search");

//export this router to use in our index.js
module.exports = router;
var express = require('express');
var router = express.Router();
var Models = require("../models/models");

router.get('/', function(req, res){
    // pulling info from url
    var check = req.originalUrl.substring(7);
    // updating DB
    Models.user.findOne(
    {"verif" : check},
    function(err, _update){
        Models.user.findOneAndUpdate(
        {"verif" : check},
        {$set : { email: _update.verif_email}},
        function(err, _updater) {
            res.redirect('/login');
        });
    });
});

//export this router to use in our index.js
module.exports = router;
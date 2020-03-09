var express = require('express');
var router = express.Router();
var models = require("../models/models");

router.get('/', function(req, res){
    models.user.findOneAndUpdate({"email": req.session.name}, {"status": new Date}, function(err, doc){
        console.log("set last seen time");
    })
    // deleted session, logging out
    delete req.session.name;
    res.redirect('/login');

});

//export this router to use in our index.js
module.exports = router;
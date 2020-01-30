var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
    Models.user.find({email: req.session.name}, function(err, doc)
    {
    });
    res.redirect("/profile");
});

module.exports = router;
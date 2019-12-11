var express = require('express');
var router = express.Router();
var Models = require("../models/models");

router.get('/', function(req, res){
    var check = req.originalUrl.substring(7);
    Models.user.findOne({verif: check}, function(err, doc){
        res.render("reset_password");
    })
})

module.exports = router;
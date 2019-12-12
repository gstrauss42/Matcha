var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');
var crypto = require('crypto');

router.post('/', bodyParser.urlencoded(), function(req, res){
    if(req.body.password == req.body.repeat){
        var pass = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);
        Models.user.findOneAndUpdate({ verif : req.body.url }
            ,{ "password" : pass }
            , function(err, doc) {
                res.redirect("login");
        });
    }
})

module.exports = router;
const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    if(!req.session.name)
        res.render('oops');
    else
    {
        models.user.find({"email": req.session.name}, function(err, doc){
            models.user.find({"email":doc.email},function(err,chatters){
                console.log("\n\n"+ chatters +"\n\n");
            });
            res.render("contacts", {"contacts":doc.contacts});
        });
    }
})

module.exports = router;
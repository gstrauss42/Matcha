var express = require('express');
var models = require("../models/models");
const bodyParser = require('body-parser');
var router = express.Router();

router.post("/", bodyParser.urlencoded({extended: true}), (req, res) => {
    models.messages.find({"from": req.session.name, "to": req.body.email}, function(err, sent){
        models.messages.find({"to": req.session.name, "from": req.body.email}, function(err, received){
            var thing = new Array;
            thing.splice(0, 0, sent);
            thing.splice(1,0, received);
            res.json(thing);
        });
    });
});

module.exports = router;
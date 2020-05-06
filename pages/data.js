var express = require('express');
var models = require("../models/models");
var router = express.Router();

router.post("/", (req, res) => {
    models.messages.find({"from": req.session.name, "to": "jadongavhansen@gmail.com"}, function(err, sent){
        models.messages.find({"to": req.session.name, "from": "jadongavhansen@gmail.com"}, function(err, received){
          res.json[sent, received];
        })
    })
});

module.exports = router;
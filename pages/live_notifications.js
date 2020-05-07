var express = require('express');
var models = require("../models/models");
var router = express.Router();

router.post("/", (req, res) => {
    models.notifications.find({email:req.session.name}, function(err, count){
        res.json(count.length);
    })    
});

module.exports = router;
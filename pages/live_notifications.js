var express = require('express');
var models = require("../models/models");
var router = express.Router();

router.get("/", (req, res) => {
    models.notifications.find({email:req.session.name}, function(err, count){
        res.json(count.length);
    })    
});

router.post('/', (req, res) => {

});

module.exports = router;
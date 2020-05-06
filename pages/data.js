var express = require('express');
var models = require("../models/models");
var router = express.Router();

router.get("/", (req, res) => {
    models.user.findOne({"email": req.session.name}, function(err, returned){
        res.json(returned);
    })
});

module.exports = router;
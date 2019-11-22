var express = require('express');
var router = express.Router();
var Model = require("../models/models");
const bodyParser = require('body-parser');

router.get('/', function(req, res){
   res.send('GET route on Profile');
});
router.post('/', bodyParser.urlencoded(), function(req, res){
   var user = new Model.user ({
      name: req.session.name,
      tag: req.body.tag
   });
   tags.save();
});

//export this router to use in our index.js
module.exports = router;
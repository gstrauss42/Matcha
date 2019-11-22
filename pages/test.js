var express = require('express');
var router = express.Router();
var session = require('express-session');
var Model = require("../models/models");
const app = express();

router.get('/', function(req, res){
   res.send(req.session);
});
router.post('/', function(req, res){
   res.send('POST route on test');
});

//export this router to use in our index.js
module.exports = router;
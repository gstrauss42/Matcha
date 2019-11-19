var express = require('express');
var router = express.Router();
const app = express()
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));

var Models = require("../db/models");


router.post('/login', function(req, res){
   res.send('POST route on LOGIN');
});

//export this router to use in our index.js
module.exports = router;
var express = require('express');
var router = express.Router();
var session = require('express-session');
const app = express()
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));
var Models = require("../models/models");
var crypto = require('crypto');

router.get('/', function(req, res){
    res.send('GET route on add_tag');
});

router.post('/', bodyParser.urlencoded(), function(req, res){

    Models.user.findOneAndUpdate(
        { email : req.session.name },
        { $push : { tags: req.body.tag}}
        , function(err, _update) {
            res.redirect('/profile');
            console.log("added tag");
      });
//    res.redirect('profile');
    // res.send(req.body.tag)
});

 module.exports = router;
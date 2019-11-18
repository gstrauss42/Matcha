var express = require('express');
var router = express.Router();
const app = express()
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));

var Models = require("../db/models");

router.post('/create', bodyParser.urlencoded(), function(req, res, next){
   var Bee = new Models.Bug ({
      bugName: req.body.name,
      bugColour: req.body.surname,
      Genus: req.body.username
   });

   Bee.save(function(err){
      if(err)
         console.error(error);
      else
         res.redirect('/');
   });
})

//export this router to use in our index.js
module.exports = router;
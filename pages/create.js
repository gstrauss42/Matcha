var express = require('express');
var router = express.Router();
const app = express()
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res){
   res.render("create")
});

var Schema = mongoose.Schema;

var user_schema = new Schema({
   name: String,
   surname: String,
   username: String
   });

var user = mongoose.model("user", user_schema)

router.post('/create', bodyParser.urlencoded(), function(req, res, next){
   var info = new user ({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username
   });

   info.save(function(err){
      if(err)
         console.error(error);
      else
         res.redirect('/');
   });
})

//export this router to use in our index.js
module.exports = router;
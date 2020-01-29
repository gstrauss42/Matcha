const bodyParser = require('body-parser');
var models = require("../models/models");

router.post('/', bodyParser.urlencoded(), function(req, res) {
    models.user.findOneAndUpdate({"email" : })
    res.redirect('profile');
  });
const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(!req.session.name)
        res.render('oops', {error : '2'});
    else
    {
        models.user.findOne({"email": req.session.name}, function(err, doc){
            models.user.find({"isverified":true},function(err,chatters){
                var results = new Array;
                var i = 0;
                chatters.forEach(element => {
                    if(doc.contacts)
                    {
                        doc.contacts.forEach(names => {
                            if(names == element.email)
                            {
                                results[i] = new models.user;
                                results[i] = element;
                                i++;
                            }
                      });
                    }
                });
                res.render("contacts", {"contacts":results});
                console.log("\n\n"+ results +"\n\n");                
            });
        });
    }
})

module.exports = router;
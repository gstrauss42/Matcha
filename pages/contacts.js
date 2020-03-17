const bodyParser = require('body-parser');
var models = require("../models/models");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(!req.session.name)
        res.render('oops');
    else
    {
        models.user.find({"email": req.session.name}, function(err, doc){
            console.log(doc.viewed + "\n\n" + doc.contacts + "\n\n\n" + doc + "\n\n\n"); // doc can be looged but and its elements are present but acessing those elements in doc returns undefined
            models.user.find({"isverified":true},function(err,chatters){
                var results;
                var i;
                chatters.forEach(element => {
                    if(doc.contacts)
                    {
                        doc.contacts.forEach(names => {
                            if(names == element.email)
                            {
                                results[i] = element;
                                i++;
                            }
                      });
                    }
                });
                res.render("contacts", {"contacts":results});
                // console.log("\n\n"+ results +"\n\n");                
            });
        });
    }
})

module.exports = router;
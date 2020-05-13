var express = require('express');
var router = express.Router();
var Models = require('../models/models');
const bodyParser = require('body-parser');
var crypto = require('crypto');

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
    if(req.body.password == req.body.repeat && req.body.repeat !== '' && req.body.password !== '')
    {
        var pass = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);
        Models.user.findOneAndUpdate({ verif : req.body.url }, { 'password' : pass }, function(err, doc){
            if (err) {
                console.log('could not reset password: ', err);
                res.render('oops', {error: '13'});
            } else {
                console.log('succesful password reset: ', doc.username, doc.email, doc.verif);
                res.redirect('login');
            }
        });
    }
    else
        res.render('oops', {error: 8});
})

module.exports = router;
var express = require('express');
var router = express.Router();
var Models = require("../models/models");

ObjectId = require('mongodb').ObjectId
fs = require('fs-extra')
// Your mongodb or mLabs connection string

multer = require('multer')
util = require('util')
// upload = multer({limits: {fileSize: 2000000 },dest:'/goinfre/gstrauss/Documents/matcha/uploads'})
upload = multer({limits: {fileSize: 2000000 },dest:'/goinfre/jhansen/Documents/matcha/uploads'})  //jadons dir.

router.post('/', upload.single('picture'), function (req, res)
{
    Models.user.findOne({email : req.session.name}, function(err, display){
        if(err)
            console.log("riperino, found variable: " + display);
        if (req.file == null)
            res.redirect('profile');
        else
        {
            // reads the img file from tmp in-memory location
            var newImg = fs.readFileSync(req.file.path);
            // encodes the file as a base64 string
            var encImg = newImg.toString('base64');
            Models.user.findOneAndUpdate({email : req.session.name},
                { $push :{images: encImg}},
                function(err, result){
                    if (err) { console.log(err); };
                        res.redirect('profile');
                });
        };
    });
});

module.exports = router;
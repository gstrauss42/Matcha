var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

ObjectId = require('mongodb').ObjectId
fs = require('fs-extra')
// Your mongodb or mLabs connection string

multer = require('multer')
util = require('util')
upload = multer({limits: {fileSize: 2000000 },dest:'/goinfre/gstrauss/Documents/matcha/uploads'})  //gabriels dir
// upload = multer({limits: {fileSize: 2000000 },dest:'/goinfre/jhansen/Documents/matcha/uploads'})  //jadons dir.

router.post('/', upload.single('picture'), bodyParser.urlencoded(), function (req, res)
{
    console.log(req.body);

    if(req.file == null)
    {
        console.log("received no file from the front end")
        return res.redirect ("profile");
    }
    Models.user.findOne({email : req.session.name}, function(err, display){
            // reads the img file from tmp in-memory location
            var newImg = fs.readFileSync(req.file.path);
            // encodes the file as a base64 string
            var encImg = newImg.toString('base64');
//     main_image: String,
//    image_one: String, 
//    image_two: String,
//    image_three: String,
//    image_four: String,
                // 
            if(req.body.main_save == '')
            {
                console.log("big test");
                Models.user.findOneAndUpdate({email: req.session.name}, {main_image: encImg}, function(err, val){
                    console.log("saved main image");
                    console.log(val)
                });
            }
            if(req.body.two_save == '')
            {
                console.log("big test");
                Models.user.findOneAndUpdate({email: req.session.name}, {image_one: encImg}, function(err, val){
                    console.log("saved first image");
                    console.log(val)
                });
            }
            if(req.body.three_save = '')
            {
                console.log("big test");
                Models.user.findOneAndUpdate({email: req.session.name}, {image_two: encImg}, function(err, val){
                    console.log("saved second image");
                    console.log(val)
                });
            }         
            if(req.body.four_save == '')
            {
                console.log("big test");
                Models.user.findOneAndUpdate({email: req.session.name}, {image_three: encImg}, function(err, val){
                    console.log("saved third image");
                    console.log(val)
                });
            }
            if(req.body.five_save == '')
            {
                console.log("big test");
                Models.user.findOneAndUpdate({email: req.session.name}, {image_four: encImg}, function(err, val){
                    console.log("saved fourth image");
                    console.log(val)
                });
            }
    });
    return res.redirect("profile");
});

module.exports = router;
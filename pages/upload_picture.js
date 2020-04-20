var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

ObjectId = require('mongodb').ObjectId
fs = require('fs-extra')

multer = require('multer')
util = require('util')
// upload = multer({limits: {fileSize: 2000000 },dest:'/Users/wtc_/Documents/matcha/uploads'});
// upload = multer({limits: {fileSize: 2000000 },dest:'/Users/Dr.Strange/Documents/projects/matcha/uploads'});
// upload = multer({limits: {fileSize: 2000000 },dest:'/goinfre/gstrauss/Documents/matcha/uploads'})
upload = multer({limits: {fileSize: 2000000 },dest:'/Users/Jadon/Documents/WTC PROJECTS/Semester 2/matcha-collab/uploads'})  //jadons laptop dir.
// upload = multer({limits: {fileSize: 2000000 },dest:'/Users/Jadon.Hansen/Desktop/MY STUFF/matcha/uploads'})  //jadons work laptop

router.post('/', upload.single('picture'), bodyParser.urlencoded({extended: true}), function (req, res)
{

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
            if(req.body.main_save == '')
            {
                Models.user.findOneAndUpdate({email: req.session.name}, {main_image: encImg}, function(err, val){
                    console.log("saved main image");
                });
            }
            if(req.body.two_save == '')
            {
                Models.user.findOneAndUpdate({email: req.session.name}, {image_one: encImg}, function(err, val){
                    console.log("saved first image");
                    console.log(val)
                });
            }
            if(req.body.three_save == '')
            {
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
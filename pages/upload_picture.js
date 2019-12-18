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
            if(req.body.main_image == '')
            {
                if(display.main_image)
                {
                    display.main_img == encImg;
                    display.save;
                }
                console.log("main_image")
            }
            if(req.body.image_one == '')
            {
                if(display.image_one)
                {
                    display.image_one == encImg;
                    display.save;
                }
                console.log("image_one")
            }            
            if(req.body.image_two == '')
            {
                if(display.image_two)
                {
                    display.image_two == encImg;
                    display.save;
                }
                console.log("image_two")
            }
            if(req.body.image_three == '')
            {
                if(display.image_three)
                {
                    display.image_three == encImg;
                    display.save;
                }
                console.log("image_three")
            }
            if(req.body.image_four == '')
            {
                if(display.image_four)
                {
                    display.image_four == encImg;
                    display.save;
                }
                console.log("image_four")
            }
    });
    res.redirect("profile");
});

module.exports = router;
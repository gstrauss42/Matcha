var express = require('express');
var models = require("../models/models");
var router = express.Router();

router.get('/update_read', (req, res) => {
    models.notifications.find({ email : req.session.name }, function (err, notifications) {
        if (err) {
            console.log('Error getting notifications');
        } else {
            notifications.forEach(element => {
                if (element.read === false) {
                    element.read = true;
                    element.save(() => {});
                }
            });
            console.log('updated all notifications to read');
        }
    });
});

router.get("/", (req, res) => {
    models.notifications.find({email:req.session.name}, function(err, count){
        res.json(count.length);
    });
});

router.post('/', (req, res) => {
    models.notifications.find({"email":req.session.name}, function(err,notif){
        let oldNotifs = new Array;
        let newNotifs = new Array;
        notif.forEach(element => {
            if (element.read === true)
                oldNotifs.push(element);
            else
                newNotifs.push(element);
        });
        res.json({new: newNotifs, old: oldNotifs});
    })
});

module.exports = router;
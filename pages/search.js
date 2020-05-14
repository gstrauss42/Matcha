var express = require('express');
var router = express.Router();
var Models = require('../models/models');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
    if(!req.session.name) {
        return(res.render('oops', {error: '2'}));
    }
    else {
        console.log('search page requirements: ', req.body);
        Models.user.findOne({email: req.session.name}, function(err, currUser) {

            // below is sorting, requires order to be either 1 or -1, and if no sort is selected then age or something is selected

            // var input = req.body.filter;
            //  Models.user.find({$query:{'isverified': 'true'}, $orderby:{ input : req.body.order}}, function(err,val){

            //  });
                Models.user.find({'isverified': 'true'}, function(err, users) {
                    if (err) {
                        console.log('Error finding users for search: ', err);
                    } else {
                        let i = 0;
                        const min_fame = currUser.fame - 5;
                        const max_fame = currUser.fame + 5;
                        while (users[i]) {
                            while (users[i]) {
                                // BY CURRENT USER PREFERENCES
                                // if user is me
                                if (users[i].email == req.session.name) {
                                    console.log('removed self: ', users[i].username);
                                    users.splice(i, 1);
                                    break;
                                }
                                // if theyre not a women and im into women
                                if (currUser.prefferances == 'Female') {
                                    if (users[i].gender != 'Female') {
                                        console.log('removed non-female user: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // if theyre not a man and im into men
                                if (currUser.prefferances == 'Male') {
                                    if (users[i].gender != 'Male') {
                                        console.log('removed non-male user: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // BY OTHER USERS PREFERENCES
                                // if theyre not other and im into other
                                if (users[i].prefferances != 'Bi-Sexual') {
                                    if (currUser.gender == 'Other') {
                                        console.log('removed non-bi-sexual user: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // if theyre into men and im not a man
                                if (users[i].prefferances == 'Male') {
                                    if (currUser.gender != 'Male') {
                                        console.log('removed man whos into men: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // if theyre into women and im not a women
                                if (users[i].prefferances == 'Female') {
                                    if (currUser.gender != 'Female') {
                                        console.log('removed woman whos into women: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }

                                // ADVANCED FILTERS BELOW
        
                                // if the user wants to search with age
                                if (req.body.age && (users[i].age != req.body.age)) {
                                    console.log('removed users with a different age: ', users[i].username);
                                    users.splice(i, 1);
                                    break;
                                }
                                // if the user wants to search with rating
                                if (req.body.rating && (users[i].fame < min_fame || users[i].fame > max_fame)) {
                                    console.log('removed non-fitting fame rated users: ', users[i].username);
                                    users.splice(i, 1);
                                    break;
                                }
                                // if the user wants to search with location
                                if (req.body.location) {
                                    if (users[i].location && currUser.location) {
                                        let city = users[i].location.split(',');
                                        let myCity = currUser.location.split(',');
                                        if (city[0].trim() !== myCity[0].trim()) {
                                            console.log('removed users with a different city: ', users[i].username);
                                            users.splice(i, 1);
                                            break;
                                        }
                                    } else {
                                        console.log('removed users with no location: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // if theyre blocked
                                if (currUser.blocked && currUser.blocked.includes(users[i].email)) {
                                    console.log('removed blocked users by me: ', users[i].username);
                                    users.splice(i, 1);
                                    break;
                                }
                                // if theyre reported  
                                if (currUser.reported && currUser.reported.contains(users[i].email)) {
                                    console.log('removed reported users by me: ', users[i].username);
                                    users.splice(i, 1);
                                    break;
                                }
                                // if the user wants to search with tags
                                if (req.body.color) {
                                    while (req.body.color[a]) {
                                        if (users[i].tags && users[i].tags.includes(req.body.color[a]))
                                            a++;
                                        else {
                                            console.log('removed user with no similiar tag: ', users[i].username);
                                            users.splice(i, 1);
                                            break;
                                        }
                                    }
                                    if(req.body.color[a]) {
                                        a = 0;
                                        break;
                                    }
                                }
                                a = 0;
                                i++;
                            }
                        }
                    }
                    if (req.body.advanced_search) {
                        res.render('search', { 'tags' : currUser.tags, 'advanced_matches': users });
                    }
                    else {
                        res.render('search', { 'tags' : currUser.tags, 'basic_matches': users });
                    }
                });
        });
    }
});

//export this router to use in our index.js
module.exports = router;
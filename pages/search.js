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
            //  Models.user.find({$query:{'isverified': 'true'}, $orderby:{ input : req.body.order}}, function(err,val){});
                Models.user.find({'isverified': 'true'}, function(err, users) {
                    let orderedArr = null;
                    if (err) {
                        console.log('Error finding users for search: ', err);
                    } else {
                        let i = 0;
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
                                // REQUIRED FILTERING
                                // automatic fame filter
                                if (!req.body.advanced_search && !req.body.fame) {
                                    if (users[i].fame !== users[i].fame) {
                                        console.log('removed unequal fame rated users: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                }
                                // automatic location filter
                                if (!req.body.advanced_search && !req.body.location) {
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
                                // automatic tag filter for max tags
                                if (!req.body.advanced_search && !req.body.color) {
                                    let a = 0;
                                    while (currUser.tags[a]) {
                                        if (users[i].tags && users[i].tags.includes(currUser.tags[a]))
                                            a++;
                                        else {
                                            console.log('removed user with non max tags: ', users[i].username);
                                            users.splice(i, 1);
                                            break;
                                        }
                                    }
                                    if (currUser.tags[a]) {
                                        a = 0;
                                        break;
                                    }
                                    a = 0;
                                }
                                // // if theyre blocked
                                // if (currUser.blocked && currUser.blocked.includes(users[i].email)) {
                                //     console.log('removed blocked users by me: ', users[i].username);
                                //     users.splice(i, 1);
                                //     break;
                                // }
                                // // if theyre reported  
                                // if (currUser.reported && currUser.reported.contains(users[i].email)) {
                                //     console.log('removed reported users by me: ', users[i].username);
                                //     users.splice(i, 1);
                                //     break;
                                // }

                                // ADVANCED FILTERS BELOW
                                if (req.body.advanced_search) {
                                    // advanced age gap search
                                    let ageGap = req.body.age;
                                    let fameGap = req.body.fame;
                                    if (req.body.age && ((users[i].age > currUser.age + ageGap) || (users[i].age < currUser.age - ageGap))) {
                                        console.log('removed user not in age gap: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                    // advanced tag search
                                    if (req.body.color) {
                                        let a = 0;
                                        while (req.body.color[a]) {
                                            if (users[i].tags && users[i].tags.includes(req.body.color[a]))
                                                a++;
                                            else {
                                                console.log('removed user with no similiar tag: ', users[i].username);
                                                users.splice(i, 1);
                                                break;
                                            }
                                        }
                                        if (req.body.color[a]) {
                                            a = 0;
                                            break;
                                        }
                                        a = 0;
                                    }
                                    // advanced fame gap search
                                    if (req.body.fame && ((users[i].fame < users[i].fame - fameGap) || (users[i].fame > users[i].fame + fameGap))) {
                                        console.log('removed user not in fame gap: ', users[i].username);
                                        users.splice(i, 1);
                                        break;
                                    }
                                    // advanced location search
                                    if (req.body.location) {
                                        if (users[i].location) {
                                            if (!users[i].location.includes(req.body.location)) {
                                                console.log('removed users with a different location: ', users[i].username);
                                                users.splice(i, 1);
                                                break;
                                            }
                                        } else {
                                            console.log('removed users with no location: ', users[i].username);
                                            users.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                                i++;
                            }
                        }
                        // do ordering here
                        if (req.body.filter && req.body.order) {
                            if (req.body.filter == 'age') {
                                orderedArr = users.sort(compareValues('age', req.body.order));
                                console.log('sorted by age');
                            } else if (req.body.filter == 'location') {
                                orderedArr = users.sort(compareValues('location', req.body.order));
                                console.log('sorted by location');
                            } else if (req.body.filter == 'fame') {
                                orderedArr = users.sort(compareValues('fame', req.body.order));
                                console.log('sorted by fame');
                            } else if (req.body.filter == 'tags') {
                                orderedArr = users.sort(compareValues('tags', req.body.order));
                                console.log('sorted by common tags');
                            }
                            // console logging new ordered array
                            let j = 0;
                            console.log('\n\nORDERED ARRAY BY: ' + req.body.filter + ' ' + req.body.order + '\n\n');
                            while (orderedArr[j]) {
                                console.log('user: ', orderedArr[j].age, orderedArr[j].location, orderedArr[j].fame, orderedArr[j].tags);
                                j++;
                            }
                        }
                    }
                    if (req.body.advanced_search) {
                        if (orderedArr) {
                            users = orderedArr;
                            console.log('Advanced search has been ordered');
                        }
                        res.render('search', { 'tags': currUser.tags, 'advanced_matches': users });
                    }
                    else {
                        if (orderedArr) {
                            users = orderedArr;
                            console.log('Search has been ordered');
                        }
                        res.render('search', { 'tags': currUser.tags, 'basic_matches': users });
                    }
                });
        });
    }
});

function compareValues(key, order) {

    return function innerSort(a, b) {

        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        
        let propertyOne = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        let propertyTwo = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (key == 'location') {
            propertyOne = a[key].split(',').trim();
            propertyTwo = b[key].split(',').trim();
            console.log('comparing two locations: ', propertyOne, propertyTwo);
        }

        if (propertyOne > propertyTwo) {
            comparison = 1;
        } else if (propertyOne < propertyTwo) {
            comparison = -1;
        }

        return((order === 'desc') ? (comparison * -1) : comparison);
    };
}

//export this router to use in our index.js
module.exports = router;
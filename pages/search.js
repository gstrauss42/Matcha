var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
    if(!req.session.name)
    {
        return(res.redirect("oops"));
    }
    else
    {
        Models.user.findOne({email: req.session.name}, function(err, doc)
        {
            console.log(req.body)
            var p = 0;
            Models.notifications.find({"email": req.session.name}, function(err, notif){
                Models.user.find({"isverified": "true"}, function(err, val){
                    let i = 0;
                    let a = 0;
                    var min_fame = doc.fame - 5;
                    while(val[i])
                    {
                        // doc is the logged in user
                        // val is all users
                        while(val[i])
                        {
                            // if theyre not a women and im into women
                            if(doc.prefferances == 'Female')
                            {
                                if(val[i].gender != 'Female')
                                {
                                    console.log("spliced 1")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre not a man and im into men
                            if(doc.prefferances == 'Male')
                            {
                                if(val[i].gender != 'Male')
                                {
                                    console.log("spliced 2")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre not other and im into other
                            if(doc.gender == 'Other')
                            {
                                if(val[i].prefferances != 'Bi-Sexual')
                                {
                                    console.log("spliced 3")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre into men and im not a man
                            if(val[i].prefferances == "Male")
                            {
                                if(doc.gender != "Male")
                                {
                                    console.log("spliced 4")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre into women and im not a women
                            if(val[i].prefferances == "Female")
                            {
                                if(doc.gender != "Female")
                                {
                                    console.log("spliced 5")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre me
                            if(val[i].email == req.session.name)
                            {
                                console.log("spliced 6")
                                val.splice(i, 1);
                                break;
                            }
                            // if the user wants to search with age
                            if(req.body.age)
                            {
                                if(val[i].age != req.body.age)
                                {
                                    console.log("spliced 7")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if the user wants to search with rating
                            if(req.body.rating)
                            {
                                if(val[i].fame < min_fame || val[i].fame > min_fame + 10)
                                {
                                    console.log("spliced 8")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if the user wants to search with location
                            if(req.body.location)
                            {
                                // get personal location and then do some sort of location ranged based finding
                                if(val[i].location != doc.location)
                                {
                                    console.log("spliced 9")
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            // if theyre blocked
                            if(doc.blocked && doc.blocked.includes(val[i].email))
                            {
                                console.log("spliced 10")
                                val.splice(i, 1);
                                break;
                            }
                            // if theyre reported  
                            if(doc.reported && doc.reported.contains(val[i].email))
                            {
                                console.log("spliced 11")
                                val.splice(i, 1);
                                break;
                            }
                            // if the user wants to search with tags
                            if(req.body.color)
                            {
                                while(req.body.color[a])
                                {
                                    if(val[i].tags && val[i].tags.includes(req.body.color[a]))
                                        a++;
                                    else
                                    {
                                        console.log("spliced 12")
                                        val.splice(i, 1);
                                        break;
                                    }
                                }
                                if(req.body.color[a])
                                {
                                    a = 0;
                                    break;
                                }
                            }
                            a = 0;
                            i++;
                        }
                    }
                    // ordered filtering 
                    // i = 0;
                    // var p = 0;
                    // var temp;
                    // var count = 0;
                    // var sorted = Array.from(val);
                    // var ret = Array.from(val);
                    // if(req.body.filter_all == "Go!")
                    // {
                    //     if(req.body.filter == "age")
                    //     {
                    //         if(req.body.order == "ascending")
                    //         {
                    //             p = ret[i];                                
                    //             ret.forEach(user => {
                    //                 var position = 0;
                    //                 while(1 != 2) //not good code red fkag right here
                    //                 {
                    //                     sorted[position] = new Models.user;
                    //                     sorted[position] = user;
                    //                 }
                    //             });
                    //             while(ret[0])
                    //             {
                    //                 while(ret[i])
                    //                 {
                    //                     if(ret[i] < p)
                    //                     {
                    //                         p = ret[i];
                    //                     }
                    //                     i++;
                    //                 }
                    //                 temp[count] = p;        
                    //                 count++;
                    //             }
                    //         }
                    //         else
                    //         {
    
                    //         }
                    //     }
                    //     else if(req.body.filter == "location")
                    //     {
                    //         if(req.body.order == "ascending")
                    //         {
    
                    //         }
                    //         else
                    //         {
                                
                    //         }
                    //     }
                    //     else if(req.body.filter == "rating")
                    //     {
                    //         if(req.body.order == "ascending")
                    //         {
    
                    //         }
                    //         else
                    //         {
                                
                    //         }
                    //     }
                    //     else if(req.body.filter == "common_tags")
                    //     {
                    //         if(req.body.order == "ascending")
                    //         {
    
                    //         }
                    //         else
                    //         {
                                
                    //         }
                    //     }
                    // }
                    res.render('search', {
                                "tags" : doc.tags,
                                "count" : notif.length,
                                "basic_matches": val
                    });
                });
            });
        });
    }
});

//export this router to use in our index.js
module.exports = router;
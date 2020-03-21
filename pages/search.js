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
            var p = 0;
            Models.notifications.find({"email": req.session.name}, function(err, notif){
                Models.user.find({"isverified": "true"}, function(err, val){
                    let i = 0;
                    var min_fame = doc.fame - 5;
                    console.log(val)
                    while(val[i])
                    {
                        while(val[i])
                        {
                            if(doc.prefferances == 'Female')
                            {
                                if(val[i].gender != 'Female')
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(doc.prefferances == 'Male')
                            {
                                if(val[i].gender != 'Male')
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(doc.gender == 'Other')
                            {
                                if(val[i].prefferances != 'Bi-Sexual')
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(val[i].prefferances == "Male")
                            {
                                if(doc.gender != "Male")
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(val[i].prefferances == "Female")
                            {
                                if(doc.gender != "Female")
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(val[i].email == req.session.name)
                            {
                                val.splice(i, 1);
                                break;
                            }
                            if(req.body.age)
                            {
                                if(val[i].age != req.body.age)
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(req.body.rating)
                            {
                                if(val[i].fame < min_fame || val[i].fame > min_fame + 10)
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(req.body.location)
                            {
                                // get personal location and then do some sort of location ranged based finding
                                if(val[i].location != doc.location)
                                {
                                    val.splice(i, 1);
                                    break;
                                }
                            }
                            if(doc.blocked && doc.blocked.includes(val[i].email))
                            {
                                val.splice(i, 1);
                                break;
                            }                            
                            if(doc.reported && doc.reported.contains(val[i].email))
                            {
                                val.splice(i, 1);
                                break;
                            }
                            // if(req.body.)
                            // {
                            //     // input sort once arrray of tags has been given
                            // }
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
                                // refine the below algorithm
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
                    console.log(val)
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
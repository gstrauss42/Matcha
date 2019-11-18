var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on Matched_profile');
});
router.post('/', function(req, res){
   res.send('POST route on matched_profile');
});

//export this router to use in our index.js
module.exports = router;
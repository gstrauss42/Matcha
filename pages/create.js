var express = require('express');
var router = express.Router();
const app = express()

app.use(express.urlencoded())

router.post('/', function(req, res){
   res.send('POST route on CREATE');
});

//export this router to use in our index.js
module.exports = router;
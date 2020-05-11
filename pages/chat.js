const bodyParser = require('body-parser');
const models = require('../models/models');
const express = require('express');
const router = express.Router();

// rendering chat page
router.post('/', bodyParser.urlencoded({extended: true}), function(req, res) {
  if(!req.session.name)
    res.render('oops', {error: '2'});
  else {
    // obtaining user info
    models.user.findOne({'email' : req.session.name}, function(err, doc){
      // obtaining chatter id
      models.user.findOne({ '_id' : req.body.id}, function(err, chatter){
        //creating new chat contact if not exists
        if(req.body.chat)
        {
          models.user.findOneAndUpdate({'email': req.session.name, $addToSet: {'contacts': chatter.email}}, function(err, contacts){
            console.log('updated logged in user contacts - chats');
          });
          models.user.findOneAndUpdate({'email': chatter.email, $addToSet: {'contacts': req.session.name}}, function(err, temp){
            console.log('updated chatters contacts - chats');
          });
        }

        if(req.body.sendMsg == 'sendMessage')
        {
          // save message to chat
          const present_time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          const message = new models.messages ({
            message: req.body.message,
            to: chatter.email,
            from: doc.email,
            time: present_time,
            read: false
          });
          message.save( function(err) {
            if (err)
                console.log('Error saving message: ', err);
            else
                console.log('updated chat messages');
          });

          // new message notification
          const notif = new models.notifications ({
            email: chatter.email,
            name: 'new message from: ' + chatter.username,
            content: req.body.message,
            time: present_time,
            read: false
          });
          notif.save( function(err) {
             if (err)
                console.log('Error saving message notif: ', err);
             else
                console.log('updated notification for new message');
          });
        }
              // finding all messages and rendering them - NOT NEEDED
              // models.messages.find({'to': chatter.email, 'from': doc.email}, function(err, messages){
              //   models.messages.find({'to': doc.email, 'from': chatter.email}, function(err, messages_from){
              //     messages_from.forEach(element => {
              //       element.read = true;
              //     });
        res.render('chat', {'username' : chatter.username, 'id' : req.body.id, 'email': chatter.email});
      });
    });
  }
});

module.exports = router;
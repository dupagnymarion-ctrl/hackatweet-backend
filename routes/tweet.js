var express = require('express');
var router = express.Router();

const Tweet = require('../models/tweet');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* POST add */
router.post('/add', (req, res) => {
  if (!checkBody(req.body, ['token', 'message'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

   User.findOne({ token: req.body.token }).then(data => {
    newTweet = new Tweet({
        user:data._id,
        message:req.body.message,
        isLiked:false
    })
    newTweet.save().then(newDoc => {
        res.json({ result: true });
      });

  });  
  
});

// GET /tweet?user=<user>&hasktag=<hasktag>
router.get("/", (req, res) => {
  if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
        } 
  const { user, hasktag } = req.query;

  User.findOne({ token: req.body.token }).then(data => {
    if(data){
        let filter = {}
        if (!user)
            filter.user=data._id
        Tweet.find(filter).then(list => {
            res.json({result:true,tweets:list});
        }); 
        }
    else{
        res.json({ result: false, error: 'User not founded' });
        return;
        }
  });  
 
});

// DELETE /tweet/:tweet_id
router.delete("/:tweet_id", (req, res) => {
  if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
        } 
  if(!req.params.tweet_id || req.params.tweet_id === ''){
        res.json({ result: false, error: 'Missing or empty param' });
        return;
        } 

    Tweet.findByIdAndDelete(req.params.tweet_id).then(list => {
        res.json({result:true,tweets:list});
        }); 
         
});

module.exports = router;

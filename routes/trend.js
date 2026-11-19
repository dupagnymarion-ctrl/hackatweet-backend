var express = require('express');
var router = express.Router();

const Trend = require('../models/trend');
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

module.exports = router;

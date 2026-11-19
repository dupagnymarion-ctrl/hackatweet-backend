var express = require('express');
var router = express.Router();

const Trend = require('../models/trend');
const Tweet = require('../models/tweet');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* POST /trend/add/:tweet_id */
router.post('/add', (req, res) => {
  if (!checkBody(req.body, ['token','hashtag'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  if(!req.params.tweet_id || req.params.tweet_id === ''){
    res.json({ result: false, error: 'Missing or empty param' });
    return;
    }

    newTrend = new Tweet({
        tweet:data._id,
        hashtag:req.body.hashtag
    })
    newTrend.save().then(newDoc => {
        res.json({ result: true });
    });

  
});

// DELETE /trend/:trend_id
router.delete("/:trend_id", (req, res) => {
  if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
        } 
  if(!req.params.trend_id || req.params.trend_id === ''){
        res.json({ result: false, error: 'Missing or empty param' });
        return;
        } 

    Trend.findByIdAndDelete(req.params.trend_id).then(list => {
        res.json({result:true,trends:list});
        }); 
         
});

// GET /trend?hashtag=<hashtag>
router.get("/", (req, res) => {
  if (!checkBody(req.body, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
        } 
  const { hashtag } = req.query;

  Trend.find({ hashtag }).populate('tweet').then(data => {
    if(data){
        res.json({result:true,trends:data});
        }
    else{
        res.json({ result: false, error: 'User not founded' });
        return;
        }
  });  
 
});

module.exports = router;

var express = require('express');
var router = express.Router();

const Trend = require('../models/trend');
const Tweet = require('../models/tweet');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* POST /trend/add */
router.post('/add', (req, res) => {
  if (!checkBody(req.body, ['token', 'tweet_id', 'hashtag'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

    newTrend = new Trend({
        tweet:req.body.tweet_id,
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

// GET /trend/:token?hashtag=<hashtag>
router.get("/:token", (req, res) => {
  if (!checkBody(req.params, ['token'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
        } 
  const { hashtag } = req.query;
  let myAggregation = []

  if(hashtag && null !== hashtag)    {
        myAggregation.push({ $match: { hashtag }} )
    }
    
   myAggregation.push({ $group: { _id: "$hashtag", count: { $sum: 1 } }} )

  Trend.aggregate(myAggregation).then(data => {
    if(data){
        //console.log(data)
        res.json({result:true,trends:data});
        }
    else{
        res.json({ result: false, error: 'User not founded' });
        return;
        }
  });  
 
});

module.exports = router;

var express = require("express");
var router = express.Router();

const Trend = require("../models/trend");
const Tweet = require("../models/tweet");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* POST add */
router.post("/add", (req, res) => {
  if (!checkBody(req.body, ["token", "message"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((data) => {
    newTweet = new Tweet({
      user: data._id,
      message: req.body.message,
      isLiked: false,
    });
    newTweet.save().then((newDoc) => {
      res.json({ result: true });
    });
  });
});
router.get("/", (req, res) => {
  Trend.aggregate([
    {
      $group: {
        _id: "$hashtag",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ])
    .then((trends) => {
      res.json({ result: true, trends: trends });
    })
    .catch(() => {
      res.status(500).json({
        result: false,
        error: "Impossible de récupérer les tendances.",
      });
    });
});

module.exports = router;

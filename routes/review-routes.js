const express = require('express');
const router  = express.Router();
const Service = require('../models/review');

/* GET home page */
router.get('/reviews', (req, res, next) => {
  Review.find()
  .then((reviewList) => {
    res.json(reviewList);
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;
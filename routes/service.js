const express = require('express');
const router  = express.Router();
const Service = require('../models/service');

/* GET home page */
router.get('/services', (req, res, next) => {
  Service.find()
  .then((list) => {
    res.json(list);
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;
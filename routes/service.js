const express = require('express');
const serviceRouter  = express.Router();
const Service = require('../models/service');

serviceRouter.get('/service', (req, res, next) => {
    Service.find()
    .then((list) => {
        res.json(list);
    })
    .catch((err) => {
        res.json(err)
    })
});

module.exports = serviceRouter;
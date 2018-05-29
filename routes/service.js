const express = require('express');
const router  = express.Router();
const Service = require('../models/service');
const User = require('../models/user');
const upload = require('../configs/multer');

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

//add a NEW task
router.post('/services/create', (req, res, next)=>{
  console.log(req.body);
    const newService = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // img: `/uploads/${req.file.filename}`
    }
  // Service.create(req.body) would work too
    Service.create(newService)
    .then((serviceJustCreated)=>{
      res.json(serviceJustCreated)
    })
    .catch((err)=>{
      res.json(err)
    })
  });

  router.get('/services/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.user, function(err, fulluser){
    res.json(fulluser);
  })
  }
  if (err) throw err;
})


router.post('/services/delete/:id', (req, res, next)=>{
      Service.findByIdAndRemove(req.params.id)
      .then((serviceJustDeleted)=>{
        res.json(serviceJustDeleted)
      })
      .catch((err)=>{
        res.json(err)
      })
    })

router.post('/services/update/:id', (req, res, next)=>{
      Service.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedService)=>{
        res.json(updatedService)
      })
      .catch((err)=>{
        res.json(err)
      })
    })

module.exports = router;
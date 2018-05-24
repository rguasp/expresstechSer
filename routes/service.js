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

//add a NEW task
router.post('/services/create', (req, res, next)=>{
  console.log(req.body);
    const newService = {
      name: req.body.name,
      description: req.body.description
    }
  // Task.create(req.body) would work too
    Service.create(newService)
    .then((serviceJustCreated)=>{
      res.json(serviceJustCreated)
    })
    .catch((err)=>{
      res.json(err)
    })

  });


    // router.post('/task/delete/:id', (req, res, next)=>{
    //   Service.findByIdAndRemove(req.params.id)
    //   .then((taskJustDeleted)=>{
    //     res.json(taskJustDeleted)
    //   })
    //   .catch((err)=>{
    //     res.json(err)
    //   })

    // })

    // router.post('/task/update/:id', (req, res, next)=>{
    //   console.log(req.body)
    //   Service.findByIdAndUpdate(req.params.id, req.body)
    //   .then((updatedTask)=>{
    //     res.json(updatedTask)
    //   })
    //   .catch((err)=>{
    //     res.json(err)
    //   })

    // })

module.exports = router;
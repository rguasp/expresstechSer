const express = require('express');
const router  = express.Router();
const Service = require('../models/service');
const User = require('../models/user');
// const upload = require('../configs/multer');

/* GET Services page */
router.get('/services', (req, res, next) => {
  Service.find()
  .then((list) => {
    res.json(list);
  })
  .catch((err) => {
    res.json(err)
  })
});


//Add a NEW service
router.post('/services/create', (req, res, next)=>{
  console.log(req.body);
    const newService = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img
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


router.post('/services/add', (req, res, next)=>{
  // console.log(req.body);
  console.log("got this far");
    const itemToAdd = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // img: `/uploads/${req.file.filename}`
    }
  Service.cart.push(itemToAdd)
  .then((serviceJustAdded)=>{
    res.json(serviceJustAdded)
  })
  .catch((err)=>{
    res.json(err)
  })

});

  //==single item
  router.get('/services/:id', (req, res, next) => {

    Service.findById(req.params.id)
    .then((oneService)=>{
      res.json(oneService)
    })
    .catch((err)=>{
      res.json(err)
    })
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

router.post('/services/update/:id', (req, res, next)=> {
  console.log("INSIDE OF EXPRESS == /services/update/:id =====>>>> 🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢")
  
  const theSelectedObjectId = req.params.id;
    console.log(typeof theSelectedObjectId);

  // console.log("===================🤲🤲🤲🤲🤲🤲🤲🤲🤲🤲🤲")
  // var dog =  theSelectedObject.split(',');
  // console.log(typeof dog);
  // console.log(dog);

      Service.findByIdAndUpdate(theSelectedObjectId, req.body)
      .then((updatedService)=>{
        console.log("===================👻👻👻👻👻👻👻👻👻👻👻👻👻👻")
        console.log(updatedService);
        res.json(updatedService)
      })
      .catch((err)=>{
        res.json(err)
      })
    })

module.exports = router;
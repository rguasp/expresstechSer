const express = require('express');
const router  = express.Router();
const Service = require('../models/service');
const User = require('../models/user');
const Cart = require('../models/cart');


/* GET home page */
// router.get('/cart', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.json({ cart: req.user.cart})
//     return;
//   }
//   res.status(403).json({ message: 'Unauthorized' });
// });

// router.get('/cart/total', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         User.find({_id: req.user.id})
//         .then((userCart) => {
//             res.json(req.user.cart);
//         })
//     }
// })

// router.post('/cart/:id/add', (req, res, next) => {
//   console.log('user service on put to cart +===========', req.user);
//   req.user.cart.unshift(req.params.id);
//   req.user.save()
//   .then(() => {
//     console.log('req user info after the then of the put to cart >>>>>><<<<<<<<<<<', req. user);
//     res.json(req.user)
//   })
//   .catch((err) => { 
//     res.json(err)
//   })
// })


// // router.put('/cart/:id/add', (req, res, next) => {
// //   console.log('user service on put to cart +===========', req.user);
// //   req.user.cart.unshift(req.params.id);
// //   req.user.save()
// //   .then(() => {
// //     console.log('req user info after the then of the put to cart >>>>>><<<<<<<<<<<', req. user);
// //     res.json(req.user)
// //   })
// //   .catch((err) => { 
// //     res.json(err)
// //   })
// // })


// router.get('/userCart', (req, res, next) => {
//   Service.find({_id: req.user.cart})
//   .exec()
//   .then((serviceResults) => {
//     res.json(serviceResults)
//   })
//   .catch((err) => {
//     res.json(err)
//   })
// })











module.exports = router;
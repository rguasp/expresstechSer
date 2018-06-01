const express     = require("express");
const authRoutes  = express.Router();
const passport    = require("passport");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const mongoose    = require('mongoose');

// Models
const User        = require("../models/user");
const Cart        = require("../models/cart");
const Service     = require('../models/service');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const currentCart = req.body.cart;
  const email = req.body.email;
  const bio = req.body.bio;

  if (username === "" || password === "" || email === "" ) {
    res.status(400).json({ message: 'Provide valid Username, Password, or Email' });
    return;
  }

  User.findOne({ username:username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username:username,
      password: hashPass,
      cart: cart,
      email:email,
      bio:bio
    });


    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Could not save user' });
        return;
      }
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Could not login new user' });
          return;
        } 
        res.status(200).json(req.user);
    });
  });
});
});



authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Could not login' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Could not authenticate the user' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});


authRoutes.delete("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: 'Success' });
});



authRoutes.get('/loggedin', (req, res, next) => {
  // console.log("logged in user in the backend route: ", req.user)
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
        // res.status(200).json("-----req.user");
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});





//BACKEND FUNCTIONS#########################
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {

    // res.redirect('/login')
    res.status(403).json({ message: 'Unauthorized' });
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      // res.redirect('/')
      res.status(403).json({ message: 'Unauthorized' });
    }
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }else {
    res.json(false);
  }
}

function addToCart(req, res, next) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}
//BACKEND FUNCTIONS#########################



     
//DISPLAYS CART CONTENTS
authRoutes.get('/cart', (req, res, next) => {
  Service.find({_id: req.user.cart})
  .exec()
  .then((merchandiseFromDb) => {
    console.log()
    res.status(200).json(merchandiseFromDb)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
})
//DISPLAYS CART CONTENTS




//ADD TO CART PROPERTY

authRoutes.put('/cart/:id/add', (req, res, next) => {
  console.log('user info on put to cart +===========', req.user);
  req.user.cart.unshift(req.params.id);
  req.user.save()
  .then(() => {
    console.log('req user info after the then of the put to cart >>>>>><<<<<<<<<<<', req.user);
    res.json(req.user)
  })
  .catch((err) => { 
    res.json(err)
  })
});
//ADD TO CART PROPERTY



//GOOGLE API SIGN IN FOR FUTURE USE
authRoutes.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

authRoutes.get("/auth/google/callback", passport.authenticate("google", {
  // failureRedirect: "/",
  // successRedirect: "/private-page"
})); 
//GOOGLE API SIGN IN FOR FUTURE USE 



module.exports = authRoutes;


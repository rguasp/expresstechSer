const express     = require("express");
const authRoutes  = express.Router();
const passport    = require("passport");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const mongoose       = require('mongoose');
const User        = require("../models/user");
const Cart        = require("../models/cart");
const Service = require('../models/service');

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


authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});





// Service.findById(mongoose.Types.ObjectId("5b031aa09e8578f2c2447cd6"))


// var array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

// Service.findById(mongoose.Types.ObjectId(oneServiceModel_Id))
//========  getUserCart() ==============


authRoutes.get('/theCart/:id', (req, res, next) => {

  //create an empty array 
  // const itemsInTheList = ['run', 'dog'];
  //d a foreach loop on req.user.cart

  // [req.params.id].forEach(function(element) {

    // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
     var myArray = req.params.id;
    //  JSON.parse(myArray);

     console.log('ARRAY LENGTH !!!!!!')
     console.log(myArray)
      console.log(typeof myArray)
     console.log(myArray.length)

     console.log("===============XXXXXXXX============")

     var resultArray = myArray.split(',');


   console.log('result LENGTH !!!!!!')
     console.log(resultArray)
      console.log(typeof resultArray)
     console.log(resultArray.length)


console.log("===============$$$$$$$$$$$$$============")


     const map1 = resultArray.map(oneServiceModel_Id => { 

        Service.findById(oneServiceModel_Id)
          .then((somethang) => {
            console.log(typeof oneServiceModel_Id)
            console.log(oneServiceModel_Id)
              console.log("========>>>> 🤢")
              console.log(somethang)
          })

     });
     
    //  mongoose.Types.ObjectId(oneServiceModel_Id)
//     for(let i=0; i <= 5; i++ ) {
// // console.log(i)
//     }


// console.log(typeof oneServiceModel_Id)
// console.log("------------------")

//         Service.findById(oneServiceModel_Id)
//           .then((somethang) => {
//             console.log(typeof oneServiceModel_Id)
//             console.log(oneServiceModel_Id)
//               console.log("========>>>> 🤢")
//               console.log(somethang)
//           })
     
//      });



    //  req.params.id.forEach(function(obj) {
    //    Service.findOne({_id: this.obj.id}) {
    //      this.id.push(this.idInCart)
    //    }
    //  });

// console.log('MAP MAP MAP MAP ============== OUTSIDE ')
//      console.log(map1);



// }



    // }
  //   // for each one of those ids, do a Service.findById and push the 
  //   //resulting service into the empty array you just created 
  //   this.itemsInTheList.unshift(element);
  // console.log("========>>>> 🤢")
  // console.log(element)
// });

  // then res.json that array


console.log("======================== 🎉`🎉`🎉`🎉`🎉`🎉`🎉`🎉`🎉`🎉`🎉`🎉`😇 ")
console.log(req.params.id);


// console.log("???????????????")
// console.log(`${JSON.stringify(req.params.id)}`);

// const util = require('util')

// console.log(util.inspect(req.params.id, {showHidden: true, depth: null}))

console.log("???????????????111111111")



  
  
  
    // res.status(200).json(this.itemsInTheList);


  // if (req.isAuthenticated()) {
  //   User.findById(req.user, function(err, user){
  //     console.log("are you getting this far?")
  //   res.json(user);
  // })
  // }
  // res.status(403).json({ message: 'Unauthorized' });
});







// //FOR USER CART PAGE // CART COMPONENT
// authRoutes.get('/cart/:id', (req, res, next) => {
//   console.log('============Express Cart Route======cart/id====')
//   if (req.isAuthenticated()) {
//     User.findById(req.user, function(err, fulluser){
//     res.json(fulluser.cart);
//   })
//   }
//   if (err) throw err;
// })




//======== addToCart() ==============

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
})



//Called from AddToCart button in service.html page.
//ROUTE 
// authRoutes.get('/cart', (req, res, next) => {
//   // console.log('user info on put to cart +===========', req.user.cart);
//   console.log('============Express Cart Route======req user====')
//   console.log(req.user)
//   if (req.isAuthenticated()) {
//     Service.findById(req.user, function(err, fulluser){
//       // console.log("fulluser?:", fulluser.cart)
//     // res.json(fulluser.cart);
//     res.json(fulluser);

//   })
//   }
//   res.status(403).json({ message: 'Unauthorized' });
// });

//     res.json(req.user.cart)
//   if (err) {
//     res.json({message: "Nothing in the cart"});
//   }
// })


 


authRoutes.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

authRoutes.get("/auth/google/callback", passport.authenticate("google", {
  // failureRedirect: "/",
  // successRedirect: "/private-page"
}));  



module.exports = authRoutes;

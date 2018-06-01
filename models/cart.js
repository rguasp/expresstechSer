const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const cartSchema = new Schema(
    [
          {
        id: String,
          //Name should be automatically entered based on session user name
        name: String,
        //This will be passed via a form shown to the user
        content: String,
        //This should be automatically entered using Date.Now
        time:  Date,
        //This should be automatically entered using service.price
        price: Number
      }
  ]
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
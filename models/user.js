const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email:    {type: String, unique: true, required: true},
  img:      {type: String, default: "../assets/images/nerd.png"},
  bio:      {type: String},
  balance:  {type: Number},
<<<<<<< HEAD
  cart:     {type: Array},
  reviews:  {type: String},
=======
  cart:     [
    {type: Schema.Types.ObjectId,
    }
    ],
>>>>>>> f01a5149a8d83a13507dfa21c0e8bb8d81be1dc4
  role: {
    type: String,
    enum : ['GUEST', 'ADMIN'],
    default : 'GUEST'
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
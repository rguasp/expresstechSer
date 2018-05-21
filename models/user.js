const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email:    {type: String, unique: true, required: true},
  username: {type: String, unique: true },
  password: {type: String},
  email:    {type: String, unique: true},
  img:      {data: Buffer, contentType: String},
  bio:      {type: String},
  balance:  {type: Number},
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
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email:    {type: String, unique: true, required: true},
=======
  username: {type: String, unique: true },
  password: {type: String},
  email:    {type: String, unique: true},
>>>>>>> c094e4b566f5f7bf79204f3a138dc3ff1087d2e1
  img:      {data: Buffer, contentType: String},
  bio:      {type: String},
  balance:  {type: Number}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
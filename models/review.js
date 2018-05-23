const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
    //Name should be automatically entered based on session user name
  name: {type: String, required: true},
  //This will be passed via a form shown to the user
  content: {type: String, required: true},
  //This should be automatically entered using Date.Now
  date:    {type: Date, required: true}
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
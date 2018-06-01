const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const serviceSchema = new Schema({
  name: {type: String},
  //Made type an enum so they are predefined.(Can definitely add more to the array).
  serviceType: {
      type: String,
      enum: ["On site", "Pick up", "Walk in"]
  },
  price:    {type: Number},
  //We can store the pics we will display for each service
  img:      {type: String, default: "../assets/images/comp2.png"},
  ///****This property will be important for determining prices? May need to be altered */
  duration:      {type: Number},
  balance:  {type: Number},
  description: {type: String},
  //Made this an Array of Objects which will allow smooth data storage from UI request form.
  requestInfo: [{
      name: {type: String},
      email:{type: String},
      phoneNumber: {type: Number},
      //*** I used this instead of "priority", Maybe the earlier it needs to be done can determine priority and pricing */
      dateServiceNeeded: {type: Date}
  }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
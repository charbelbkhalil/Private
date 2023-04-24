var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  driver: { type: Schema.Types.ObjectId, ref: "Driver" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  locations: [
    {
      address: { type: String },
      city: { type: String },
      district: { type: String },
      description: { type: String },
    },
  ],
  orderPickupDate: { type: Date },
  orderArrivalDate: { type: Date },
  phase: { type: Number, default: 0 },
  contactNumber: { type: Number },
  created_at: Date,
});

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;

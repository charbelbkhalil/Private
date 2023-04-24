var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  driver: { type: Schema.Types.ObjectId, ref: "Driver" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  ip: String,
  created_at: Date,
});

var Sessions = mongoose.model("Session", sessionSchema);

module.exports = Sessions;

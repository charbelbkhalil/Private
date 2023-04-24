var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var driverSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  created_at: Date,
});

driverSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

var Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;

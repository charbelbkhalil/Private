var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var companySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
});

companySchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

var Company = mongoose.model("Company", companySchema);

module.exports = Company;

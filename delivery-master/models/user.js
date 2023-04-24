var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var userSchema = new Schema({
  firstName: { type: String ,required: true, },
  lastName: { type: String,required: true, },
  email: { type: String,required: true, unique: true },
  password: { type: String,required: true, },
  verified: {type: Boolean , default:false},
  created_at:  Date,
});


userSchema.pre("save", function (next) {
  if(!this.isModified('password')) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;

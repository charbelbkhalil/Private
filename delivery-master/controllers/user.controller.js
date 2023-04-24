var jwt = require("jsonwebtoken");
var jwt_decode = require("jwt-decode");
var config = require("../config");
var User = require("../models/user");
var Session = require("../models/session");
var bcrypt = require("bcryptjs");
const saltRounds = 10;


exports.UserRegister = async (req, res) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(),
  });
  user
    .save()
    .then((userData) => {
      res.send({
        success: true,
        data: userData,
        message: "User registered",
      });
    })
    .catch((err) => {
      res
        .send({
          success: false,
          error: err,
          message: "User already exists",
        })
        .status(409);
    });
};

exports.UserLogin = async function (req, res, next) {
   User.findOne({
    email: req.body.email,
  }).then(function (user, err) {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, compRes) {
        if (!compRes) {
          res.json({
            success: false,
            message: "Wrong Password",
          });
        } else {
          var payload = {
            id: user._id,
            role: "user",
          };
          var token = jwt.sign(payload, config.secret);
          User.findById(user._id, function (err, result) {
            var newSession = new Session({
              ip: req.body.ip,
              user: user._id,
              created_at: new Date(),
            });
            newSession.save().then((data) => {
              res.send({
                success: true,
                id: result._id,
                token: token,
              });
            });
          });
        }
      });
    }
  });
};

const Driver = require("../models/driver");
const User = require("../models/user");
var Session = require("../models/session");
var jwt = require("jsonwebtoken");
var config = require("../config");
var bcrypt = require("bcryptjs");

exports.GetMainPage = async (req, res) => {
  res.render("index", { title: "Delivery Demo" });
};

exports.GeneralAuth = async (req, res) => {
  const email = req.body.email;
  var auth = [];

  await User.find({
    email: email,
  }).then((data) => {
    if (data.length > 0) {
      auth.push("user");
    }
  });

  await Driver.find({
    email: email,
  }).then((data) => {
    if (data.length > 0) {
      auth.push("driver");
    }
  });

  if (auth[0] === "user") {
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
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, compRes) {
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
                    role: "user"
                  });
                });
              });
            }
          }
        );
      }
    });
  } else if (auth[0] === "driver") {
    Driver.findOne({
      email: req.body.email,
    }).then(function (driver, err) {
      if (err) throw err;

      if (!driver) {
        res.json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      } else if (driver) {
        bcrypt.compare(
          req.body.password,
          driver.password,
          function (err, compRes) {
            if (!compRes) {
              res.json({
                success: false,
                message: "Wrong Password",
              });
            } else {
              var payload = {
                id: driver._id,
                role: "driver",
              };
              var token = jwt.sign(payload, config.secret);
              Driver.findById(driver._id, function (err, result) {
                var newSession = new Session({
                  ip: req.body.ip,
                  driver: driver._id,
                  created_at: new Date(),
                });
                newSession.save().then((data) => {
                  res.send({
                    success: true,
                    id: result._id,
                    token: token,
                    role: "driver"
                  });
                });
              });
            }
          }
        );
      }
    });
  }
};

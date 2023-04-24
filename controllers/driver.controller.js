var jwt = require("jsonwebtoken");
var jwt_decode = require("jwt-decode");
var config = require("../config");
var Driver = require("../models/driver");
var Session = require("../models/session");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.DriverRegister = async (req, res) => {
  var driver = new Driver({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    company: req.body.companyId,
    created_at: new Date(),
  });
  driver
    .save()
    .then((driverData) => {
      res.send({
        success: true,
        data: driverData,
        message: "Driver registered",
      });
    })
    .catch((err) => {
      res
        .send({
          success: false,
          error: err,
          message: "Driver already exists",
        })
        .status(409);
    });
};

exports.DriverLogin = async function (req, res, next) {
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
                });
              });
            });
          }
        }
      );
    }
  });
};

exports.GetDriversByCompany = async (req, res) => {
  Driver.find({ company: req.body.companyId })
    .populate({ path: "company", select: "_id name email created_at" })
    .exec((err, driversData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: driversData,
        message: "All Drivers By Company",
      });
    });
};

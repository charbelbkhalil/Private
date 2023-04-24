var jwt = require("jsonwebtoken");
var jwt_decode = require("jwt-decode");
var config = require("../config");
var Company = require("../models/company");
var Session = require("../models/session");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.CompanyRegister = async (req, res) => {
  var company = new Company({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(),
  });
  company
    .save()
    .then((companyData) => {
      res.send({
        success: true,
        data: companyData,
        message: "Company registered",
      });
    })
    .catch((err) => {
      res
        .send({
          success: false,
          error: err,
          message: "Company already exists",
        })
        .status(409);
    });
};

exports.CompanyLogin = async function (req, res, next) {
  Company.findOne({
    email: req.body.email,
  }).then(function (company, err) {
    if (err) throw err;

    if (!company) {
      res.json({
        success: false,
        message: "Authentication failed. Company not found.",
      });
    } else if (company) {
      bcrypt.compare(
        req.body.password,
        company.password,
        function (err, compRes) {
          if (!compRes) {
            res.json({
              success: false,
              message: "Wrong Password",
            });
          } else {
            var payload = {
              id: company._id,
              role: "company",
            };
            var token = jwt.sign(payload, config.secret);
            Company.findById(company._id, function (err, result) {
              var newSession = new Session({
                ip: req.body.ip,
                company: company._id,
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

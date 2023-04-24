var express = require("express");
var router = express.Router();
var apis = require("../controllers/company.controller");

router.post("/login", apis.CompanyLogin);
router.post("/register", apis.CompanyRegister);

module.exports = router;

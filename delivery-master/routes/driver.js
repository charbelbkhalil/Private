var express = require('express');
var router = express.Router();
var apis = require("../controllers/driver.controller");

router.post("/login", apis.DriverLogin);
router.post("/register", apis.DriverRegister);
router.get("/company", apis.GetDriversByCompany);

module.exports = router;

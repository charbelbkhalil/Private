var express = require('express');
var router = express.Router();
var apis = require("../controllers/user.controller");

router.post("/login", apis.UserLogin);
router.post("/register", apis.UserRegister);

module.exports = router;

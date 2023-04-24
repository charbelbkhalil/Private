var express = require("express");
var router = express.Router();
var apis = require("../controllers/session.controller");
var auth = require("../middlewares/auth");

router.get("/", apis.GetAllSessions);

module.exports = router;

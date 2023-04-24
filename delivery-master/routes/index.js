var express = require("express");
var router = express.Router();
var apis = require("../controllers/index.controller")

router.get("/", apis.GetMainPage);
router.post("/login", apis.GeneralAuth)

module.exports = router;

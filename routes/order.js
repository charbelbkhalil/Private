var express = require("express");
var router = express.Router();
var apis = require("../controllers/order.controller");
var auth = require("../middlewares/auth");

router.get("/", apis.GetAllOrders);
router.get("/driver/myorders", apis.GetAllOrdersByDriver);
router.get("/user/myorders", apis.GetAllOrdersByUser);
router.get("/company/myorders", apis.GetAllOrdersByCompany);
router.get("/:id", apis.GetAllOrdersById);
router.post("/", apis.CreateOrder);
router.put("/assign", apis.AssignDriverToOrder);

module.exports = router;

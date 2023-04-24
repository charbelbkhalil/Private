var Order = require("../models/order");
var jwt_decode = require("jwt-decode");

exports.CreateOrder = async (req, res) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  var decodedtoken = jwt_decode(token);
  var locations = req.body.locations;

  var order = new Order({
    user: decodedtoken.id,
    locations: [],
    orderPickupDate: req.body.orderPickupDate,
    orderArrivalDate: req.body.orderArrivalDate,
    contactNumber: req.body.contactNumber,
    company: req.body.company,
    created_at: new Date(),
  });

  order.locations = [];
  locations.forEach((item) => {
    order.locations.push(item);
  });

  order
    .save()
    .then((orderData) => {
      res.send({
        success: true,
        data: orderData,
        message: "Order created",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err,
      });
    });
};

exports.GetAllOrders = async (req, res) => {
  Order.find({})
    .populate("user", "firstName lastName email created_at verified _id")
    .populate("company", "name email created_at _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .exec((err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "All Orders",
      });
    });
};

exports.AssignDriverToOrder = async (req, res) => {
  Order.findByIdAndUpdate(
    req.body.orderId,
    { driver: req.body.driverId, phase: 1 },
    (err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "Driver Assigned to Order",
      });
    }
  );
};

exports.GetAllOrdersByDriver = async (req, res) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  var decodedtoken = jwt_decode(token);
  Order.find({ driver: decodedtoken.id })
    .populate("user", "firstName lastName email created_at verified _id")
    .populate("company", "name email created_at _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .exec((err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "All Orders",
      });
    });
};

exports.GetAllOrdersByUser = async (req, res) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  var decodedtoken = jwt_decode(token);
  Order.find({ user: decodedtoken.id })
    .populate("user", "firstName lastName email created_at verified _id")
    .populate("company", "name email created_at _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .exec((err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "All Orders",
      });
    });
};

exports.GetAllOrdersByCompany = async (req, res) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  var decodedtoken = jwt_decode(token);
  Order.find({ company: decodedtoken.id })
    .populate("user", "firstName lastName email created_at verified _id")
    .populate("company", "name email created_at _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .exec((err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "All Orders",
      });
    });
};

exports.GetAllOrdersById = async (req, res) => {
  Order.findById(req.params.id)
    .populate("user", "firstName lastName email created_at verified _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .exec((err, orderData) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: orderData,
        message: "All Orders",
      });
    });
};

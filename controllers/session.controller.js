var Session = require("../models/session");

exports.GetAllSessions = async (req, res) => {
  Session.find({})
    .populate("user", "firstName lastName email created_at verified _id")
    .populate({
      path: "driver",
      select: "firstName lastName email created_at _id company",
      populate: { path: "company", select: "_id name email created_at" },
    })
    .populate("company", "name email created_at _id")
    .exec((err, result) => {
      if (err) res.send(err);
      res.send({
        success: true,
        data: result,
        message: "All Sessions",
      });
    });
};

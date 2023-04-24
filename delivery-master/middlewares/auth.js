var jwt = require("jsonwebtoken");
var config = require("../config");

var auth = function(requirement){
return async (req, res, next) =>{
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token != null) {
    req.token = token;
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        err.message = "unverified token";
        return res.send({ success: false, message: "unverified token" });
      }
      req.decoded = decoded;
      console.log(decoded);
      var authorized = false;
      for (i = 0; i < requirement.length; i++) {
        if(decoded.role === requirement[i]){
          authorized = true;
        }
     }
      if (authorized) {
        next();
      } else {
        var i;
        var text = '';
        for (i = 0; i < requirement.length; i++) {
          text += requirement[i].charAt(0).toUpperCase() + requirement[i].slice(1) ;
          if(i< requirement.length - 1 && requirement.length!=1){
            text += ' or ';
          }
       }

        res.send(text +" Permissions Needed").status(403);
      }
    });
  } else {
    res.send("Unauthorized").status(401);
  }
}};

module.exports = auth;

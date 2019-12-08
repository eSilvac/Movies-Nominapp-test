const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  const verySecret = "6926F2BF8BC542620DB47571A88C1DA761C976744CA554833C4BAA917ACD0E20";
  
  if (token == null) {
    res.status(401).json({ error: "No Authorized" });
  } else {
    try {
      const payload = jwt.verify(token, verySecret);
      const userId = payload.userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        console.log("Usuario válido");
        req.currentUser = userId
        next();
      } else {
        res.status(404).json({ error: "User not found" });
      }

    } catch (err) {
      console.log(err)
      res.status(401).json({ error: "Invalid token" });
    }
  }
}

module.exports = requireUser;

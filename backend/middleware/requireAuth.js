const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //next is to go to the next peice of middleware
  //verify authentication
  const { authorization } = req.headers; // header has a authorization property

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //check jwt {we send token as part of the authroization in the header}
  // token of form ::: 'Bearer jffgjj.gfhgfhg.gfhfhfgh'   (3 parts)
  //so split by space and take second part [1]
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); //this returns id of user

    //attach user to the req for next middleware
    req.user = await User.findOne({ _id }).select("_id"); // only attach id of the user
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

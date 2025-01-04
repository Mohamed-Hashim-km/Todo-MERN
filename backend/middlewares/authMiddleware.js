import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, "12345"); //for token verify The Token Inside Have user Id
        req.user = await User.findById(decoded.userId).select("-password");    //.select userd for not show password
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorised,Invalid Token");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorised,No Token");
    }
  } catch (error) {
    next(error);
  }
};

export { protect };

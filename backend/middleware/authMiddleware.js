import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt-eComApp'
  token = req.cookies.eComAppJWT;

  if (token) {
    try {
      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedJWT.userID).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token...");
  }
});

// Check for Admin User
const authorisedAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorised for admin access.");
  }
});

export { authenticate, authorisedAdmin };

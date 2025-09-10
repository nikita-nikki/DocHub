
const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require('../utils/apiError.js');
const User = require('../models/users.js');
const jwt = require('jsonwebtoken');

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");
      console.log(token);
    if (!token) {
      throw new ApiError(401, "User not found");
    }
    const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded_token?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(500, error?.message || "Invalid Access Token");
  }
});

module.exports = verifyJWT;


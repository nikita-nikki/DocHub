
const express = require('express');
const router = express.Router();


const verifyJWT = require('../middleware/auth.js');
const { getCurrentUser,
        loginUser,
        logoutUser,
        refreshAccessToken,
        registerUser} = require('../controllers/user.js');

console.log("Controllers loaded:", { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser });



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current").get(verifyJWT, getCurrentUser);

module.exports = { userRouter: router };

const {SignIn, Register} = require('../../controllers/userController')
const express = require("express");
const router = express.Router();
// Load input validation
const { json } = require("express");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", Register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", SignIn);

module.exports = router;
const express = require("express");
const { createOtp, signUp, logIn, sendOtpForgotPassword, forgotPasswordOtpVerify, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/create-otp",createOtp);
router.post("/signUp",signUp);
router.post("/logIn",logIn);
router.post("/sendOtpForgotPassword",sendOtpForgotPassword);
router.post("/forgotPasswordOtpVerify",forgotPasswordOtpVerify);
router.put("/resetPassword",resetPassword);







module.exports = router; 

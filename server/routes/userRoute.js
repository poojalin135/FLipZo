const express = require("express");
const { createOtp, signUp, logIn } = require("../controllers/authController");
const router = express.Router();

router.post("/create-otp",createOtp);
router.post("/signUp",signUp);
router.post("/logIn",logIn);





module.exports = router; 

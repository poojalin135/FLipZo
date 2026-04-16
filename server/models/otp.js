const mongoose = require("mongoose");
const { sendMail } = require("../utils/sendMail");
const { otpEmailTem } = require("../templets/otpEmailTem");


const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt :{
        type:Date,
        default: Date.now,
        expires :5*60,
    }
});
const sendOtp = async (email,otp)=>{
    await sendMail(email," For Otp verification",otpEmailTem(otp))
}
otpSchema.pre("save", async function () {
    await sendOtp(this.email, this.otp);
});

module.exports = mongoose.model("OTP",otpSchema);
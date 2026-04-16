const nodemailer = require("nodemailer")


exports.sendMail = async(email,subject,body)=>{
    try{
 
        const transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
       const info = await transpoter.sendMail({
            from:`"Flipzo" <${process.env.MAIL_USER}>`,
            to:email,
            subject:subject,
            html:body,
        })
        return info;

    }catch(error){
        console.log("Error occure during sending mail",error);
    }
}
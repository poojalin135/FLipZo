exports.otpEmailTem = (otp)=>{
   return (
   `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Flipzo OTP Verification</title>

<style>
body{
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, sans-serif;
}

.wrapper{
    width:100%;
    padding:40px 0;
}

.container{
    width:500px;
    margin:auto;
    background:#ffffff;
    padding:30px;
    border-radius:10px;
    text-align:center;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
}

.logo{
    font-size:28px;
    font-weight:bold;
    color:#4A6CF7;
    margin-bottom:10px;
}

.heading{
    font-size:22px;
    color:#333;
}

.text{
    font-size:14px;
    color:#555;
    margin-top:10px;
    line-height:1.6;
}

.otp{
    font-size:30px;
    letter-spacing:8px;
    font-weight:bold;
    background:#f2f4ff;
    padding:15px;
    border-radius:8px;
    display:inline-block;
    margin:20px 0;
    color:#4A6CF7;
}

.expire{
    font-size:13px;
    color:#d9534f;
}

.contact{
    margin-top:20px;
    font-size:13px;
    color:#555;
}

.footer{
    margin-top:25px;
    font-size:12px;
    color:#999;
}
</style>

</head>

<body>

<div class="wrapper">

<div class="container">

<div class="logo">Flipzo</div>

<h2 class="heading">Email Verification</h2>

<p class="text">
Hello,<br><br>
Thank you for using <b>Flipzo</b>. Please use the OTP below to verify your email address.
</p>

<div class="otp">
${otp}
</div>

<p class="expire">
⚠ This OTP will expire in 5 minutes.
</p>

<p class="text">
For security reasons, please do not share this OTP with anyone.
</p>

<div class="contact">
Need help? Contact us at <br>
<b>poojalinsahoo20@gmail.com</b>
</div>

<div class="footer">
© 2026 Flipzo <br>
Founder: <b>POOJALIN<b>
</div>

</div>

</div>

</body>
</html>   
   `
   )
}